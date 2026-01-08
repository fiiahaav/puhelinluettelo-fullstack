const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))
app.use(express.json()) 


const persons = [
  { id: 1, name: "Artto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.get('/info', (request, response) => {
  const totalPersons = persons.length       
  const now = new Date()                   
  response.send(
    `<p>Phonebook has info for ${totalPersons} people</p>
     <p>${now}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id == id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const personExists = persons.find(person => person.id == id)

   if (personExists) {

    const index = persons.findIndex(person => person.id == id)
    persons.splice(index, 1)  
    response.status(204).end() 
  } else {
    response.status(404).end() 
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body


  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
 
  const nameExists = persons.some(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const id = Math.floor(Math.random() * 1000000) + 1

  const newPerson = {
    id: id,
    name: body.name,
    number: body.number
  }

  persons.push(newPerson)
  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
