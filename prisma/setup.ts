import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const hobbies = [
    {
        name: 'Skiing',
        image: 'skiing.jpg',
        active: true
    },
    {
        name: 'Swimming',
        image: 'swimming.jpg',
        active: true
    },
    {
        name: 'Dancing',
        image: 'dancing.jpg',
        active: true
    },
    {
        name: 'Cooking',
        image: 'cooking.jpg',
        active: false
    },
]

const users = [
    {
        email: 'arita@email.com',
        name: 'Arita',
        photo: 'arita.jpg',
        hobbies: {
            connect: [
                {
                    name: 'Cooking'
                },
                {
                    name: 'Dancing'
                }
            ]
        }
    },
    {
        email: 'ed@email.com',
        name: 'Ed',
        photo: 'ed.jpg',
        hobbies: {
            connect: [{ name: 'Skiing' }, { name: 'Swimming' }]
        }
    },
    {
        email: 'nicolas@email.com',
        name: 'Nicolas',
        photo: 'nicolas.jpg',
        hobbies: {
            connect: [{ name: 'Cooking' }, { name: 'Swimming' }]
        }
    }
]




async function createStuff() {

    // for (const hobby of hobbies) {
    //     await prisma.hobby.create({ data: hobby })
    // }

    for (const user of users) {
        await prisma.user.create({ data: user })
    }

}
createStuff()