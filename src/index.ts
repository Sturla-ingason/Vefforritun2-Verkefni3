import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { app as authorsApi } from './api/authorsApi.js'
import { app as news } from './api/newsApi.js'

const app = new Hono()

app.use(prettyJSON())

//erum að skjala hvað endapunktar eru í boði
app.get('/', (c) => {
  return c.json({
    '/authors' : [
      {
        method: 'get',
        description: 'get all authors, paginated'
      },
      {
        method: 'get/:id',
        description: 'gets a user from their user id'
      },
      {
        method: 'post',
        description: 'adds a new user to the database. Takes inn a username and email address'
      },
      {
        method: 'put',
        description: 'updates a user from their user id'
      },
      {
        method: 'delete',
        description: 'deletes a user with the given user id'
      }
    ],
    '/news' : [
      {
        method: 'get',
        description: 'gets all the news, paginated'
      },
      {
        method: 'get/:slug',
        description: 'gets the news artical from the name inn a slug form'
      },
      {
        method: 'post',
        description: 'adds another news artical from the createNewsArticalSchema found inn zodTest.ts'
      },
      {
        method: 'put',
        description: 'updates news artical according to the new parameters given'
      },
      {
        method: 'delete',
        description: 'deletes a news artical according to the news artical id'
      }
    ]
  })
})


app.route('/authors', authorsApi);
app.route('/news', news)


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
