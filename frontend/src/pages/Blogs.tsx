import Appbar from "../components/Appbar";
import BlogCards, { Avatar } from "../components/BlogCards";
import SkeletonChildren from "../components/SkeletonComponent";
import { useBlogs } from "../hooks";

const Blogs = () => {
    const {loading, blogs} = useBlogs(); // Corrected variable name to 'blogs'

    // Show loading message while data is being fetched
    if (loading) {
        return <div>
             
 <SkeletonChildren/>

        </div>; // Show loading when loading is true
    }

    return (
        <div>
            <Appbar />
            <div className="flex  flex-col  gap- 4 justify-center">
                <div className="max-w-xl">
                    {blogs.map((b: { author: { name: string; }; id:string ,title: string; content: string; }, ) => (
                        <BlogCards 
                        // userId={userId}
                            key={b.id} // Use a unique key, ideally something like b.id if available
                            authorName={b.author.name}
                            title={b.title}
                            content={b.content} id={b.id}                        />
                    ))}
                </div>
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
                    <Avatar name="User Name" />
                    <p className="font-bold mt-2">User Name</p>
                    <p className="text-sm text-gray-600">Short description about the user</p>
                </div>
            </div>
        </div>
    );
};

export default Blogs;