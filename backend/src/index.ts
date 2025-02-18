import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/posts';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware for JWT Authentication


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


  


export default app;
