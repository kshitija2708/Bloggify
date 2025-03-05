import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify,decode } from 'hono/jwt';
// import { JWTPayload } from 'hono/utils/jwt/types';
import { createPostInput,updatePostInput } from '@100xdevs/common-app';
export const blogRouter=new Hono<{
Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },

  Variables: {
    userId: string;
    postId:string

  };

}>();

blogRouter.use('/*',async(c,next)=>{
    
      const jwt = c.req.header('Authorization');
      if (!jwt) {
        return c.json({ error: 'unauthorized' }, 401);
      }
      try {
        const token = jwt.split(' ')[1];
        const payload = await verify(token, c.env.JWT_SECRET);
    
        if (!payload || !payload.id) {
          return c.json({ error: 'unauthorized' }, 401);
        }
    
        // Set the userId in the context
        c.set('userId', payload.id as string);
        await next();
      } catch (error) {
        console.error('JWT verification error:', error);
        return c.json({ error: 'unauthorized' }, 401);
      }
    });
    blogRouter.get('/bulk', async (c) => {
      try {
          const prisma = new PrismaClient({
              datasourceUrl: c.env?.DATABASE_URL,
          }).$extends(withAccelerate());
    
          // Fetch all blogs
          const blogs = await prisma.post.findMany({
              select: {
                  id: true,
                  title: true,
                  content: true,
                  author: {
                      select: { name: true }
                  }
              }
          });
    
          if (!blogs || blogs.length === 0) {
              return c.json({ message: "No blogs found", blogs: [] });
          }
    
          return c.json({ blogs: blogs || [] }); // Always return an array, never null
    
    
      } catch (err) {
          console.error("Error fetching blogs:", err);
          return c.json({ message: "Error fetching blogs" }, 500);
      }
    });

blogRouter.get('/:id', async(c) => {
    try {
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
      const id=c.req.param('id')
        
      const blog = await prisma.post.findFirst({
        where: { id: id },
        include: { 
            author: { select: { name: true } } 
        }
    });
    if (blog && blog.author && blog.author.name === null) {
      blog.author.name = "Anonymous";  // Default name if null
  }
     
        return c.json(
            {blog}
        );
    }
         catch(err){
            console.log(err);
            return c.json({
                message:"not detected"
            })}
          
            
  });
  
  blogRouter.post('/', async(c) => {
    try {
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const userId=c.get("userId")
        const body = await c.req.json();
        const { success } = createPostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "invalid input" });
        }
        const blog = await prisma.post.create({
          data: {
          title:body.title,
          content:body.content,
          authorId:userId
          
          },
       
        });
        return c.json({
            blog
          })}
         catch(err){
            console.log(err);
            return c.status(404);
         }
    
  });
 //add pagination 



  blogRouter.put('/:id', async(c) => {
    try {
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const id=c.req.param('id')
        const body = await c.req.json();
        const { success } = updatePostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "invalid input" });
        }
        const blog = await prisma.post.update({
            where:{
                id:id
            },
          data: {
          title:body.title,
          content:body.content,
          },
        });
        return c.json({
            blog
        });}
         catch(err){
            console.log(err);
            return c.status(404);
         }
    
  });