import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Avatar } from "./BlogCards";
import SkeletonChildren from "./SkeletonComponent";

const BlogOne = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading) return <div className="text-center text-lg"><SkeletonChildren/></div>;
    if (!blog) return <div className="text-center text-red-500">Blog not found</div>;

    return (
        <div className="min-h-screen bg-blue-100 flex-wrap flex-col  py-10">
            <div className="bg-red-100"></div>
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center gap-2">
                    <Avatar name={blog.author?.name || "Anonymous"} />
                    <p className="text-gray-700 font-semibold">
                        {blog.author?.name || "Anonymous"}
                    </p>
                </div>
               

                <h1 className="text-3xl font-extrabold mt-4">{blog.title}</h1>
                <div className="border-b border-gray-300 my-2"></div>

                <p className="text-lg text-gray-800 leading-relaxed">{blog.content}</p>
            </div>
            <div className="bg-red-100"></div>
        </div>
    );
};

export default BlogOne;
