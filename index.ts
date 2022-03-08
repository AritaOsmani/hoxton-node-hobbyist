import express from 'express'
import cors from 'cors'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000;

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({ include: { hobbies: { select: { name: true } } } })
    res.send(users)
})

app.get('/hobbies', async (req, res) => {
    const hobbies = await prisma.hobby.findMany({ include: { user: { select: { name: true, photo: true } } } })
    res.send(hobbies)
})

app.post('/users', async (req, res) => {
    const { email, name, photo, hobbies = [] } = req.body
    const newUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            photo: photo,
            hobbies: {
                connectOrCreate: hobbies.map((hobby: any) => ({
                    where: { name: hobby.name },
                    create: hobby
                }))
            }
        },
        include: { hobbies: true }
    })

    res.send(newUser)
})

app.post('/addHobby', async (req, res) => {
    const { email, hobbies } = req.body
    const user = await prisma.user.update({
        where: { email: email },
        data: {
            hobbies: {
                connectOrCreate: hobbies.map((hobby: any) => ({
                    where: {
                        name: hobby.name
                    },
                    create: hobby
                }))
            }
        },
        include: { hobbies: true }
    })
    res.send(user)
})

app.get('/hobbies/:id', async (req, res) => {
    const id = Number(req.params.id);

    const match = await prisma.hobby.findFirst({
        where: { id: id },
        include: { user: { select: { name: true } } }
    })
    if (match) {

        res.send(match)
    } else {
        res.status(404).send({ error: 'Hobby not found!' })
    }
})

app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const match = await prisma.user.findFirst({
        where: {
            id: id
        },
        include: {
            hobbies: {
                select: {
                    name: true,
                    active: true
                }
            }
        }
    })
    if (match) {
        res.status(200).send(match)
    } else {
        res.status(404).send({ error: 'User not found!!' })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
