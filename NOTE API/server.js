import express from 'express'
import dbconnect from './config/db.js'
import auth from './router/authRoute.js'
import note from './router/noteRoute.js'
import cors from 'cors'

dbconnect()
const port = 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/auth',auth)
app.use('/note',note)

app.get('/',(req,res)=>{
    res.send('helo world from server')
})


app.listen(port, ()=>{
console.log(`app running on port : port`)
});
