import express from 'express'
import folder from "../model/folder.js"

const app = express.Router()

app.get('/', (req, res) => {
    res.send('hello form folder')
})

app.post('/save', async (req, res) => {
    try {

        const title = req.body
        if (title != '') {
            await folder.create({ title })
            res.status(200).json({
                done: true,
                message: "folder is create"
            })
        }
        else {
            res.status(400).json({
                don: false,
                message: 'folder ka kuch name to do'
            })
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/folders', async (req, res) => {
    try {
        const folders = await folder.find()
        if (folders.length !== 0) {
            res.status(200).json(folders)
        }
        else {
            res.json({
                done: false,
                message: 'folder not found'
            })
        }
    }
    catch(error){
    res.status(500).send(error)
    }
})

export default app