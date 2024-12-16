import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { users } from "../users.js";
import { posts } from "../posts.js";
const app = new Hono();

app.use("*", cors());
/*app.get('/', (c) => {
  return c.text('Hello world!')
})*/
// app.get('/', () => {
//   return new Response('Good morning!')
// })
/*app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})*/
/*const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}

app.get('/page', (c) => {
  return c.html(<View />)
})*/
// HTTP Methods
// app.get('/', (c) => c.text('GET /'))
// app.post('/', (c) => c.text('POST /'))
// app.put('/', (c) => c.text('PUT /'))
// app.delete('/', (c) => c.text('DELETE /'))

// Wildcard
// app.get('/wild/*/card', (c) => {
//   return c.text('GET /wild/*/card')
// })

// // Any HTTP methods
// app.all('/hello', (c) => c.text('Any Method /hello'))

// // Custom HTTP method
// app.on('PURGE', '/cache', (c) => c.text('PURGE Method /cache'))

// // Multiple Method
// app.on(['PUT', 'DELETE'], '/post', (c) =>
//   c.text('PUT or DELETE /post')
// )

// // Multiple Paths
// app.on('GET', ['/hello', '/ja/hello', '/en/hello'], (c) =>
//   c.text('Hello')
// )
//app.post('/posts', (c) => c.text('Created!', 201))

// const readData= fetch('my-first-app/users.json')
// .then(response => response.json())
// .then(data => console.log)

app.get("/post", (c) => {
  return c.json(posts);
});

app.get("/post/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  if (id != undefined) {
    const post = posts.find((u) => u.post_id == parseInt(id));

    if (!post) {
      return c.text("post not found");
    } else {
      return c.json(post);
    }
  } else {
    return c.text("id is undefined");
  }
});

app.get("/user", (c) => {
  //console.log("hello");
  return c.json(users);
});

app.get("/user/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  if (id != undefined) {
    const user = users.find((u) => u.user == parseInt(id));

    if (!user) {
      return c.text("user not found");
    } else {
      return c.json(user);
    }
  } else {
    return c.text("id is undefined");
  }
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
