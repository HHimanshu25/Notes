import express from "express"
import notes from "../model/note.js"

const app = express.Router()

app.get('/',(req,res)=>{
    res.send('hello from noteroute')
})

app.post('/notes',async(req,res)=>{
    try{

        const {title,content,user_id} = req.body        
        if(content!=""){
            await notes.create({title,content,user_id})
            res.send('note saved')
        }else{
            res.send('please write something')
        }
    }
    catch(error){
        res.json({
            message:'something went wrong',
            error:error
        })
    }
})

app.get('/allnotes/:user_id', async (req, res) => {
    try {
        const userId = req.params.user_id;
        console.log("USER ID:", req.params.user_id);

        const note = await notes.find({ user_id: userId });

        if (note.length === 0) {
            return res.status(404).json({ message: "No notes found" });
        }

        res.json(note);
        // console.log(note);        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getnotes/:id',async(req,res)=>{
    const note = await notes.findById(req.params.id)

    if(!note){
        return res.send('note not found')
    }

    res.json(note)
})

app.put('/update/:id',async(req,res)=>{
    const {title,content} = req.body

    const note = await notes.findById(req.params.id)

    if(!note){
        return res.send('note not found')
    }

    note.title = title
    note.content = content

    await note.save()

    res.send('updated')
})

app.delete('/delete/:id',async(req,res)=>{
    await notes.findByIdAndDelete(req.params.id)
    res.send('note deleted')
})

app.delete('/delete',async(req,res)=>{
    await notes.deleteMany()
    res.send('all notes deleted')
})

export default app