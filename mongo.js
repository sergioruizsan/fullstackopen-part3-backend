const mongoose = require('mongoose')

if(process.argv.length < 3 || process.argv.length > 6) {
    console.log('Pelase provide one of the following options:')
    console.log('To retrieve all persons:   node mongo.js <password>')
    console.log('To add a new person:       node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://admin:${password}@cluster0.abwvbql.mongodb.net/personApp?retryWrites=true&w=majority`
mongoose
    .connect(url)
    .catch(error => {
        console.log(error)
        process.exit(1)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if ( name && number){
    const person = new Person({ name, number })
    person.save().then(()=>{
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
        process.exit()
    })

} else {
    Person.find({}).then( result => {
        console.log("phonebook:");
        result.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
        process.exit()
    })
}

