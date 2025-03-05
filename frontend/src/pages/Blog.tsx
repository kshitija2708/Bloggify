import Appbar from "../components/Appbar";
import BlogOne from "../components/BlogOne";
import SkeletonChildren from "../components/SkeletonComponent";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
 export const Blog = () => {
    const {id}=useParams();
    const {loading, blog} = useBlog({
        id:id||""
    }); 
    if(!blog){
        return <>not found</>
    }
    if (loading) {
        return <div><SkeletonChildren/></div>; // Show loading when loading is true
    }

    return (
        <div>
            <Appbar />
            <BlogOne/>
        </div>
    );
};

export default Blog;