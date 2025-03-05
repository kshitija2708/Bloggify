import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import ContentBox from "../components/ContentBox";

const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!title.trim() || !content.trim()) {
            setError("Title and content cannot be empty.");
            return;
        }
    
        setLoading(true);
        setError("");
        setSuccess(false);
    
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No auth token found! Please log in.");
            setLoading(false);
            return;
        }
    
        try {
            console.log("Submitting:", { title, content }); // ✅ Debugging
    
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            console.log("Blog published:", response.data); // ✅ Debugging
            setTitle("");
            setContent("");
            setSuccess(true);
        } catch (error) {
            console.error("Error publishing blog:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to publish the blog. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex justify-center w-full py-10">
            <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Publish a Blog</h1>
                
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Blog published successfully!</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="editor-container">
                        <ContentBox setContent={setContent} />
                    </div>

                    <button
                        type="submit"
                        className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish"}
                    </button>
                </form>

                {/* ✅ Renders the formatted text output */}
                <div className="border p-4 rounded-lg mt-4 bg-gray-100">
                    <h2 className="text-lg font-semibold">Preview:</h2>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </div>
    );
    
};

export default Publish;
