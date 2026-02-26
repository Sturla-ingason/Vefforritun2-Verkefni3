import {prisma} from '../src/prisma.js'

async function main() {
    const a1 = await prisma.authors.create({
        data:{
            email: 'auth1@example.org',
            name: 'auth1'
        }
    })
    const a2 = await prisma.authors.create({
        data:{
            email: 'auth2@example.org',
            name: 'auth2'
        }
    })
    const a3 = await prisma.authors.create({
        data:{
            email: 'auth3@example.org',
            name: 'auth3'
        }
    })
    const a4 = await prisma.authors.create({
        data:{
            email: 'auth4@example.org',
            name: 'auth4'
        }
    })
    const a5 = await prisma.authors.create({
        data:{
            email: 'auth5@example.org',
            name: 'auth5'
        }
    })
    const a = await prisma.authors.create({
        data:{
            email: 'auth6@example.org',
            name: 'auth6'
        }
    })
    const a7 = await prisma.authors.create({
        data:{
            email: 'auth7@example.org',
            name: 'auth7'
        }
    })
    const a8 = await prisma.authors.create({
        data:{
            email: 'auth8@example.org',
            name: 'auth8'
        }
    })
    const a9 = await prisma.authors.create({
        data:{
            email: 'auth9@example.org',
            name: 'auth9'
        }
    })
    const a10 = await prisma.authors.create({
        data:{
            email: 'auth10@example.org',
            name: 'auth10'
        }
    })
    const a11 = await prisma.authors.create({
        data:{
            email: 'auth11@example.org',
            name: 'auth11'
        }
    })



    const new1 = await prisma.news.create({
        data: {
            authorId: 1,
            content: "Frétt 1",
            excerpt: "test1",
            title: "Test1",
            slug: "test1"
        }
    })
    const new2 = await prisma.news.create({
        data: {
            authorId: 2,
            content: "Frétt 2",
            excerpt: "test2",
            title: "Test2",
            slug: "test2"
        }
    })
    const new3 = await prisma.news.create({
        data: {
            authorId: 3,
            content: "Frétt 3",
            excerpt: "test3",
            title: "Test3",
            slug: "test3"
        }
    })
    const new4 = await prisma.news.create({
        data: {
            authorId: 4,
            content: "Frétt 4",
            excerpt: "test4",
            title: "Test4",
            slug: "test4"
        }
    })
    const new5 = await prisma.news.create({
        data: {
            authorId: 5,
            content: "Frétt 5",
            excerpt: "test5",
            title: "Test5",
            slug: "test5"
        }
    })
    const new6 = await prisma.news.create({
        data: {
            authorId: 6,
            content: "Frétt 6",
            excerpt: "test6",
            title: "Test6",
            slug: "test6"
        }
    })
    const new7 = await prisma.news.create({
        data: {
            authorId: 7,
            content: "Frétt 7",
            excerpt: "test7",
            title: "Test7",
            slug: "test7"
        }
    })
    const new8 = await prisma.news.create({
        data: {
            authorId: 8,
            content: "Frétt 8",
            excerpt: "test8",
            title: "Test8",
            slug: "test8"
        }
    })
    const new9 = await prisma.news.create({
        data: {
            authorId: 9,
            content: "Frétt 9",
            excerpt: "test9",
            title: "Test9",
            slug: "test9"
        }
    })
    const new10 = await prisma.news.create({
        data: {
            authorId: 10,
            content: "Frétt 10",
            excerpt: "test10",
            title: "Test10",
            slug: "test10"
        }
    })
    const new11 = await prisma.news.create({
        data: {
            authorId: 11,
            content: "Frétt 11",
            excerpt: "test11",
            title: "Test11",
            slug: "test11"
        }
    })

}


main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})

