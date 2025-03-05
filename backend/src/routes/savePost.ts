import {Hono} from 'hono'
import { PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
export const saveRouter=new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
      };
      Variables: {
        userId: string;
        postId:string
      };
}>();

saveRouter.get('/:userId',async(c)=>{


    const userId=c.req.param('userId')
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
          }).$extends(withAccelerate());
        const savedPosts=await prisma.savePost.findMany({
            where:{
                userId
            },
            select:{
                post:true
            }
        })
        return c.json({savedPosts})

          
        }
          catch(error){
            return c.json({message:"something went wrong"},500)
          }
})

saveRouter.post('/:postId/:userId',async(c)=>{
    const postId=c.req.param("postId")
    const userId=c.req.param("userId")
   try{ const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
  const exist=await prisma.savePost.findFirst({
    where:{
        postId,userId
    }
  })
  if(exist)return c.json({ message:"already saved"})
    const save= await prisma.savePost.create({
data:{
    userId,postId
}})
return c.json(save)

    }
      catch(error){
        return c.json({message:"something went wrong"},500)
      }

})
saveRouter.delete('/:postId/:userId',async(c)=>{
    const postId=c.req.param("postId")
    const userId=c.req.param("userId")
   try{ const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
  const exist=await prisma.savePost.deleteMany({
    where:{
        postId,userId
    }
  })
  
   
return c.json({message:"Successfullydeleted"})

    }
      catch(error){
        return c.json({message:"something went wrong"},500)
      }

})