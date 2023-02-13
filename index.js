const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Person = require('./models/Person')


app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.post('/Person', async(req, res) => {
    const {name, salary, approved} = req.body

    const Person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(Person)
        res.status(201).json({mesage: 'insert correctly'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

app.get('/', (req, res)=>{
res.json({message: 'OI express'})
}) 

mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://camilasouzadev:1DFwjwgaeX6Mmdzi@apicluster.syvjthh.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
    console.log("sucess connected with MongoDB")
    app.listen(3000)
})
.catch((err)=> console.log(err))