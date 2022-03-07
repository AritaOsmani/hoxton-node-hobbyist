import express from 'express'
import cors from 'cors'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000;

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({ include: { hobby: true } })
    res.send(users)
})

app.get('/hobbies', async (req, res) => {
    const hobbies = await prisma.hobby.findMany({ include: { userHobby: true } })
    res.send(hobbies)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
