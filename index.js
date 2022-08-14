require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

// For API client success and errors responses, see:
// https://www.rfc-editor.org/rfc/rfc9110.html#name-successful-2xx
// https://www.rfc-editor.org/rfc/rfc9110.html#name-client-error-4xx
const HTTP_NOT_FOUND = 404
const HTTP_BAD_REQUEST = 400
const HTTP_NO_CONTENT = 204

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

app.get('/info', (_, response) => {
    Person
        .countDocuments({})
        .then(count => {
            response.send(`\
            <div>Phonebook has info for ${count} people<div>
            <div>${new Date().toString()}</div>\
            `)
        })
})

app.get('/api/persons', (_, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(HTTP_NOT_FOUND).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => {
            next(error)
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(
        request.params.id, 
        person, 
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(HTTP_NOT_FOUND).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(HTTP_NO_CONTENT).end()
        })
        .catch(error => next(error))
})

const unkownEndpoint = (request, response) => {
    response.status(HTTP_NOT_FOUND).send({ error: 'unkown endpoint' })
}
app.use(unkownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.name)
    if (error.name === 'CastError') { //invalid :id
        return response.status(HTTP_BAD_REQUEST).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(HTTP_BAD_REQUEST).send({ error: error.message})
    }
    if (error.message.indexOf('duplicate key error') !== -1) {
        return response.status(HTTP_BAD_REQUEST).send({ error: 'Person already exists'})
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})