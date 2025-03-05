import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';

import { signinInput, signupInput } from 'input-variables-blog'
export const userRouter=new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      userId: string;
      postId:string
    };
  }>();
// Signup Route
userRouter.post('/signup', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
const {success}=signupInput.safeParse(body);
   if(!success){
    return c.text("Invalid Inputs")
   } 
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name:body.name,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// Signin Route
userRouter.post('/signin', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const user = await prisma.user.findFirst({
       where: {
        email: body.email,
        password:body.password
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 403);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ "jwt":jwt });
  } catch (error) {
    console.error('Error during signin:', error);
    return c.json({ error: 'Signin failed' }, 500);
  }
});