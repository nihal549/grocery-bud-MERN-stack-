const express= require('express')
const Data = require('./mongoose')
const app = express()  

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const port =   process.env.PORT||5454

//called from ingrediant.js  adds to db 
app.post('/add', async(req,res)=>{
   const ingredient={title:req.body.title,
                     amount: req.body.amount}
    console.log(ingredient)
 const Pdata = new Data(ingredient)

    try {
        await Pdata.save()
        res.status(200).send(Pdata)
    } catch (e) {
        res.status(400).send(e)
    }
})
//called from ingrediant.js  sends all data from db
app.get('/send',(req,res)=>{
   Data.find({}).then((allDocs)=>{
       res.send(allDocs)

   }).catch((e)=>{
       res.status(404).send()
   })


})
//called from search.js  fetch from db 
app.post('/send',(req,res)=>{
   Data.find({title:req.body.title}).then((allDocs)=>{
       res.send(allDocs)

   }).catch((e)=>{
       res.status(404).send()
   })
})
app.post('/delete',async(req,res)=>{
      try {
        const data = await Data.findOneAndDelete({title:req.body.title})

        if (!data) {
            return res.status(404).send()
        }

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



app.listen(port,()=>{
   console.log(`port is up ${port}`)
})