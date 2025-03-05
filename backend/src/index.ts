import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
// import { sign, verify } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/posts';
import { cors } from 'hono/cors';
import likeRouter from './routes/likes';
import commentRouter from './routes/comments';
import { saveRouter } from './routes/savePost';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    postId:string
  };
}>();

// Middleware for JWT Authentication

app.use('/*',cors({
   origin: 'http://localhost:5173'
}))
// Health Check Route
app.get('/', (c) => {
  return c.text('Server is working');
});

// Environment Variables Check Route
app.get('/e', (c) => {
  const databaseUrl = c.env.DATABASE_URL || 'DATABASE_URL not found';
  const jwtSecret = c.env.JWT_SECRET || 'JWT_SECRET not found';

  console.log('Database URL:', databaseUrl);
  console.log('JWT Secret:', jwtSecret);

  return c.json({ databaseUrl, jwtSecret });
});

app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)

app.route('/api/v1/likes',likeRouter)
app.route('/api/v1/comments',commentRouter)
app.route('/api/v1/savedposts',saveRouter)
  


export default app;
