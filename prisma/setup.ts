import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const users = [
    {
        email: 'arita@email.com',
        name: 'Arita',
        photo: 'arita.jpg'
    },
    {
        email: 'ed@email.com',
        name: 'Ed',
        photo: 'ed.jpg'
    },
    {
        email: 'nicolas@email.com',
        name: 'Nicolas',
        photo: 'nicolas.jpg'
    }
]

const hobbies = [
    {
        name: 'Skiing',
        image: 'skiing.jpg'
    },
    {
        name: 'Swimming',
        image: 'swimming.jpg'
    },
    {
        name: 'Dancing',
        image: 'dancing.jpg'
    },
    {
        name: 'Cooking',
        image: 'cooking.jpg'
    },
]

const userHobbies = [
    {
        userId: 1,
        hobbyId: 3,
        active: false
    },
    {
        userId: 1,
        hobbyId: 4,
        active: true
    },
    {
        userId: 2,
        hobbyId: 1,
        active: true
    },
    {
        userId: 2,
        hobbyId: 2,
        active: true
    },
    {
        userId: 3,
        hobbyId: 2,
        active: false
    },
    {
        userId: 3,
        hobbyId: 4,
        active: true
    }
]

async function createStuff() {
    // for (const user of users) {
    //     await prisma.user.create({ data: user })
    // }
    // for (const hobby of hobbies) {
    //     await prisma.hobby.create({ data: hobby })
    // }
    for (const userHobby of userHobbies) {
        await prisma.userHobby.create({ data: userHobby })
    }
}
createStuff()