import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'


const Person = ({ addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map(person => 
        <li key={person.name}>{person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>  
        </li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(null), 3000)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      showMessage(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber}

    personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
  })
   .catch(error => showMessage('Failed to add person'))
} 

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const deletePerson = id => {
  const person = persons.find(p => p.id === id)

  if (window.confirm(`Delete ${person.name}?`)) {
    personService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))

    })
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <h3>Add a new</h3>
      <Person
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App

