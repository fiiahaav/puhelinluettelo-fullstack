const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let persons = [
  { id: 1, name: 'Matti Meikäläinen', number: '040-1234567' },
  { id: 2, name: 'Maija Mallikas', number: '050-7654321' }
]


app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const person = { ...req.body, id: Date.now() }
  persons.push(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})


app.use(express.static('dist'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
