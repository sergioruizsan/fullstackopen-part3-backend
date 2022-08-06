const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (_, response) => {
    response.send(`\
    <div>Phonebook has info for ${persons.length} people<div>
    <div>${new Date().toString()}</div>\
    `)
})

app.get('/api/persons', (_, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = "Person not found";
        response.status(404).end()
    }
})

const generateId = () => Math.floor(Math.random() * 100000000)

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(request.body)
    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const name = body.name
    if (!name) {
        return response.status(400).json({
            error: 'name attribute is missing'
        })
    }

    const nameExists = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    if (nameExists) {
        return response.status(400).json({
            error: 'name attribute already exists'
        })
    }

    const number = body.number
    if (!number) {
        return response.status(400).json({
            error: 'number attribute is missing'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const unkownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unkown endpoint' })
}
app.use(unkownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})