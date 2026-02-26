import { Hono } from "hono";
import {prisma} from '../prisma.js'
import { zValidator } from "@hono/zod-validator";
import {pagingSchema, createAuthorSchema} from './zodTest.js'


export const app = new Hono();

app.onError((err, c) => {
    console.error(err)
    return c.json({error: 'Internal server error'}, 500)
})


// tekur við offset og limit querystring breytum sem stýra paging
// ef valid annars eitthvað deafault
app.get('/', zValidator('query', pagingSchema), async (c) => {
    //console.log('query', c.req.query('limit'), c.req.valid('query').limit)
    const limit = c.req.valid('query').limit
    const offset = c.req.valid('query').offset

    const authors = await prisma.authors.findMany({ skip: offset, take: limit})
    const authorsCount = await prisma.authors.count()

    const response = {
        data: authors,
        paging: {
            limit,
            offset,
            count: authorsCount
        }
    }

    return c.json(response);
})



app.get('/:id',async (c) => {
    const id = c.req.param('id');

    const author = await prisma.authors.findUnique({
        where: { id: Number(id)}
    })

    if(!author){
        return c.json({ error: 'not found'}, 404)
    }

    return c.json(author)
})



app.delete('/:id', async (c) => {
    const id = c.req.param('id');

    const author = await prisma.authors.findUnique({
        where: { id: Number(id)}
    })

    if(!author){
        return c.json({ error: 'not found'}, 404)
    }

    await prisma.authors.delete({ where: { id: Number(id) } })

    return c.json(null, 200)
})



app.post('/', zValidator('query', createAuthorSchema), async (c) => {
    const name = c.req.valid('query').name
    const email = c.req.valid('query').email

    await prisma.authors.create({data: {name, email}})

    return c.json(null, 201)

})



app.put('/:id',zValidator('query', createAuthorSchema), async (c) => {
    const id = c.req.param('id')

    const name = c.req.valid('query').name
    const email = c.req.valid('query').email

    const author = await prisma.authors.findUnique({
        where: { id: Number(id)}
    })

    if(!author){
        return c.json({ error: 'not found'}, 404)
    }

    const updated = await prisma.authors.update({
        where: {id: Number(id)}, 
        data: {name, email}
    })

    return c.json(updated, 200)

})

