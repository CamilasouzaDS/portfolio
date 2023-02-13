const express = require('express')
const mongoose = require('mongoose')
const app = express()


const Person = require('./models/Person')


app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.post('/person', async (req, res) => {
    const { name, salary, approved } = req.body
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
      await Person.create(person)
  
      res.status(201).json({ message: 'connected!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.get('/person', async (req, res) => {
    try {
      const people = await Person.find()
  
      res.status(200).json(people)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.get('/person/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const person = await Person.findOne({ _id: id })
  
      if (!person) {
        res.status(422).json({ message: 'No user found!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.patch('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const { name, salary, approved } = req.body
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
  
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'No user found!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.delete('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'No user found!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'User removed sucefully!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.get('/', (req, res) => {
    res.json({ message: 'Conected!' })
  })

mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://camilasouzadev:1DFwjwgaeX6Mmdzi@apicluster.syvjthh.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
    console.log("connected with MongoDB")
    app.listen(3000)
})
.catch((err)=> console.log(err))