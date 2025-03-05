import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { BACKEND_URL } from "../config";
interface BlogCardProps{
    id:string,
    authorName:string,
    title:string,
    content:string,
    userId:string

}
interface SavedPost{
  postId:string
}
const BlogCards = ({id,authorName,title,content,userId}:BlogCardProps) => {
    // const [tooltip,setTooltip]=useState("");
    const readingTime=Math.ceil(content.length/100);
    const truncatedContent= content.length > 100 ? `${content.slice(0, 100)}...` : content;
    const [isSaved,setIsSaved]=useState(false)

    useEffect(() => {
      const fetchSavedPosts = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/savedposts/${userId}`);
          const savedPosts :SavedPost[]=response.data.savedPosts;
          setIsSaved(savedPosts.some((post)=>post.postId===id));
        } catch (error) {
          console.error("Error fetching saved posts", error);
        }
      };
    
      fetchSavedPosts();
    }, [userId]);

    const handleSavePost = async () => {
      try {
        setIsSaved((prev) => !prev); 
    
        if (isSaved) {
          await axios.delete(`${BACKEND_URL}/api/v1/savedposts/${id}/${userId}`);
        } else {
          await axios.post(`${BACKEND_URL}/api/v1/savedposts/${id}/${userId}`);
        }
      } catch (error) {
        console.error("Error saving post", error);
        setIsSaved((prev) => !prev); 
      }
    };
    
    return (
       
        <div className="flex flex-col p-4 border justify-center mx-auto max-w-3xl mt-4 border-gray-300 rounded-lg shadow-md bg-white pb-2 cursor-pointer">
        <div className="flex items-center justify-between mb-2">
        <Link to={`/blog/${id}`}> <Avatar name={authorName} />
            <div className="font-light  text-sm sm:text-base">{authorName}</div>   </Link>
           <div className="relative cursor-pointer hover:scale-110 transition">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
</svg>

 </div>


        </div>
        <div className="flex flex-col">
            <div className="font-bold text-lg sm:text-xl mb-1">{title}</div>
            <div className="text-gray-700 mb-2 text-sm sm:text-base " dangerouslySetInnerHTML={{ __html: truncatedContent }}>
               
            </div>
           <div className="text-sm sm:text-xs text-gray-500 mb-2">{`${readingTime} minute${readingTime !== 1 ? 's' : ''} read`}</div>
          
           <div className="flex flex-wrap gap-4 mb-2"> <div className="cursor-pointer hover:scale-110 transition"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg></div>
<div className="cursor-pointer hover:scale-110 transition">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
</svg></div>
{/* save*/}
<div
  className="cursor-pointer hover:scale-110 transition ml-auto"
  onClick={handleSavePost}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={isSaved ? "black" : "none"} // ✅ Change fill color dynamically
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
    />
  </svg>
</div>
</div>


            <div className='bg-slate-200 h-1 w-full'></div>
        </div>
    </div>
 
    );
};

export default BlogCards;
 export function Avatar({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-small text-gray-600 dark:text-gray-300">{name && name.length > 0 ? name[0] : 'A'}</span>
</div>
}