import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";
type BlogType = {
    id: string;
    title: string;
    content: string;
    author?: { name?: string | null };
};
export const useBlogs=()=>{

const [loading,setLoading]=useState(true);
const [blogs,setBlogs]=useState([]);
useEffect(
    ()=>{

           const token = localStorage.getItem("token");
           if (!token) {
              console.error("No auth token found!");
              return;
           }
           
           axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
               headers: { Authorization: `Bearer ${token}` }
           })
           .then(response=>{
            setBlogs(response.data.blogs)
            setLoading(false)
           })
    },[]
)

    return{
         loading,
         blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    
    const [blog, setBlog] = useState<BlogType>(); // Change to singular 'blog'

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No auth token found!");
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setBlog(response.data.blog); 
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blog:", error);
            setLoading(false);
        });
    }, [id]);

    return { loading, blog }; 
};
