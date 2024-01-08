// server

const mongoose = require('mongoose')
const express = require('express')

// Schema >> Collection
const dishSchema = mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    quantity:{type:Number},
    classify:{type:String}
})

const collection = mongoose.model('dish',dishSchema)

mongoose.connect("mongodb://mongo:27017/mec")

const app = express()
app.use(express.json())


// database operation

// insert document
app.post('/new',async(req,res)=>{
    const newDocument = new collection({
    name:req.body.name,
    price:req.body.price,
    quantity:req.body.quantity,
    classify:req.body.classify
    })
    const data = await newDocument.save()
    res.json(data)
})

app.get('/view',async(req,res)=>{
    const everything = await collection.find()
    res.json(everything)
})

app.get('/class/:which',async(req,res)=>{
    const few = await collection.find({classify:req.params.which})
    res.json(few)
})


app.put('/change',async(req,res)=>{
    const tem = await collection.updateOne({_id:req.body._id},req.body,{upsert:true})
    res.json(tem)
})

app.delete('/remove/:id',async(req,res)=>{
    const temp = await collection.findByIdAndDelete(req.params.id)
    res.json(temp)
})

app.listen('1234',()=>{
    console.log('server is running!!!!!!!!!!!')
})