import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { app as authorsApi } from './api/authorsApi.js';
import { app as news } from './api/newsApi.js';
const app = new Hono();
app.use(prettyJSON());
//erum að skjala hvað endapunktar eru í boði
app.get('/', (c) => {
    return c.json({
        '/authors': [
            {
                method: 'get',
                description: 'get all authors, paginated'
            },
            {
                method: 'post'
            },
            {
                method: 'put'
            },
            {
                method: 'delete'
            }
        ]
    });
});
app.route('/authors', authorsApi);
app.route('/news', news);
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
