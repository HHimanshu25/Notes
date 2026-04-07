import express from 'express'
import bcrypt from 'bcrypt'
import user from '../model/user.js'

const app = express.Router()

app.get('/', (req, res) => {
    res.status(200).send('hello from auth')
})

app.post('/register', async (req, res) => {
    try {        
        const { name, email, password } = req.body
        const check = await user.findOne({ email })
        if (!check) {
            const hashpassword = await bcrypt.hash(password, 10)
            const User = await user.create({ name, email, password: hashpassword })
            
            res.status(201).json({
                done: true,
                user:User.name,
                email:User.email
            })
        }
        else {
            res.json({
                done: false
            })
        }
    }
    catch (error) {
        res.json({
            message: error
        })
    }
})
app.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const checkemail = await user.findOne({ email });

    if (!checkemail) {
        return res.json({
            success: false,
            message: "Email not found"
        });
    }

    const valid = await bcrypt.compare(password, checkemail.password);

    if (!valid) {
        return res.json({
            success: false,
            message: "Wrong password"
        });
    }

    res.json({
        success: true,
        message: "You are logged in",
        user: checkemail.name,
        email:checkemail.email
    });
});

export default app