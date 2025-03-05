import {Hono} from 'hono'
import { PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
 
  export  const commentRouter=new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      userId: string;
      postId:string
    };
  }>();

 commentRouter.get('/:postId',async(c)=>{
  const prisma = new PrismaClient({
       datasourceUrl: c.env?.DATABASE_URL,
     }).$extends(withAccelerate());
     const postId=c.req.param("postId");
     try{
        const comments=await prisma.comment.findMany({
            where:{postId},
            include:{
                user:true
            }
        })
        return c.json({comments})
     }
     catch(error){
        return c.json({
            error:"Something went wrong"
        },500)
     }
    
 }


    )

    commentRouter.post('/:postId/:userId',async(c)=>{
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
          }).$extends(withAccelerate());
        const postId=c.req.param("postId")
        const userId=c.req.param("userId")
        const {content}= await c.req.json();
        try{
               const comment=await prisma.comment.create({
                data:{
                    postId,userId,content
                }
               })
              
                return c.json({comment})
               }
               
        
        catch(error){
            return c.json({message:"something went wrong"},500)
        }
    })
    commentRouter.delete('/:postId/:userId',async(c)=>{
        const postId=c.req.param("postId")
        const userId=c.req.param("userId")
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
          }).$extends(withAccelerate());
          try{
            await prisma.comment.deleteMany({
                where:{
                    postId,userId
                },
            })
            return c.json({
                message:"deleted"
            })
          }
          catch(error){
            return c.json({message:"something went wrong"},500)
          }

    })




































    export default commentRouter;