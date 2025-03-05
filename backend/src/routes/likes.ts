import {Hono} from 'hono'
import { PrismaClient
    
 } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
 
  export  const likeRouter=new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      userId: string;
      postId:string
    };
  }>();

 likeRouter.get('/:postId',async(c)=>{
  const prisma = new PrismaClient({
       datasourceUrl: c.env?.DATABASE_URL,
     }).$extends(withAccelerate());
     const postId=c.req.param("postId");
     try{
        const likeCount=await prisma.like.count({
            where:{postId},
        })
        return c.json({postId,likeCount})
     }
     catch(error){
        return c.json({
            error:"Something went wrong"
        },500)
     }
    
 }


    )

    likeRouter.post('/:postId/:userId',async(c)=>{
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
          }).$extends(withAccelerate());
        const postId=c.req.param("postId")
        const userId=c.req.param("userId")
        try{
               const exist=await prisma.like.findFirst({
                where:{
                    postId,userId
                }
               })
               if(exist){
                return c.json({message:"liked before"})
               }
               const like = await prisma.like.create({
                data: { postId, userId },
              });
              return c.json({
                message:"liked succesfully"
              })
        }
        catch(error){
            return c.json({message:"something went wrong"},500)
        }
    })
    likeRouter.delete('/:postId/:userId',async(c)=>{
        const postId=c.req.param("postId")
        const userId=c.req.param("userId")
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
          }).$extends(withAccelerate());
          try{
            await prisma.like.deleteMany({
                where:{
                    postId,userId
                },
            })
            return c.json({
                message:"Unliked"
            })
          }
          catch(error){
            return c.json({message:"something went wrong"},500)
          }

    })




































    export default likeRouter;