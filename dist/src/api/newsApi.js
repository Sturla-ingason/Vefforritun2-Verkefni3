import { Hono } from "hono";
import { prisma } from '../prisma.js';
import { zValidator } from "@hono/zod-validator";
import { pagingSchema, createNewsSchema } from './zodTest.js';
export const app = new Hono();
// tekur við offset og limit querystring breytum sem stýra paging
// ef valid annars eitthvað deafault
app.get('/', zValidator('query', pagingSchema), async (c) => {
    //console.log('query', c.req.query('limit'), c.req.valid('query').limit)
    const limit = c.req.valid('query').limit;
    const offset = c.req.valid('query').offset;
    const authors = await prisma.news.findMany({ skip: offset, take: limit });
    const authorsCount = await prisma.news.count();
    const response = {
        data: authors,
        paging: {
            limit,
            offset,
            count: authorsCount
        }
    };
    return c.json(response);
});
//TODO get by id
app.get('/:slug', async (c) => {
    const slug = c.req.param('slug');
    const news = await prisma.news.findMany({ where: { slug: String(slug) } });
    if (!news) {
        return c.json({ error: "not found" }, 404);
    }
    return c.json(news);
});
//TODO create news
app.post('/', zValidator('query', createNewsSchema), async (c) => {
    const authId = c.req.valid('query').authId;
    const content = c.req.valid('query').content;
    const excerpt = c.req.valid('query').excerpt;
    const published = c.req.valid('query').published;
    const title = c.req.valid('query').title;
    //Búm til slug út frá title til að geta leitað eftir
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const news = await prisma.news.create({ data: {
            authorId: authId,
            content,
            excerpt,
            published,
            title,
            slug
        } });
    if (!news) {
        return c.json("not created", 505);
    }
    return c.json(news, 201);
});
//TODO delete news
app.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const news = await prisma.news.findUnique({ where: { id: Number(id) } });
    if (!news) {
        return c.json("news artical not found", 404);
    }
    await prisma.news.delete({ where: { id: Number(id) } });
    return c.json(null, 200);
});
//TODO update news
app.patch('/:id', zValidator('query', createNewsSchema), async (c) => {
    const id = c.req.param('id');
    const authId = c.req.valid('query').authId;
    const content = c.req.valid('query').content;
    const excerpt = c.req.valid('query').excerpt;
    const published = c.req.valid('query').published;
    const title = c.req.valid('query').title;
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const news = await prisma.news.findUnique({ where: { id: Number(id) } });
    if (!news) {
        return c.json("news artical not found", 404);
    }
    const updated = await prisma.news.update({
        where: { id: Number(id) },
        data: { authorId: authId, content, excerpt, published, title, slug }
    });
    return c.json(updated, 200);
});
