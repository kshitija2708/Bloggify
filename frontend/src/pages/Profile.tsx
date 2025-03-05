import { useState } from "react";

interface ProfileProps {
  name: string;
  email: string;
}

export default function Profile({ name, email }: ProfileProps) {
  const [activeTab, setActiveTab] = useState("myBlogs");

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      {/* Avatar & User Info */}
      <div className="flex flex-col items-center mb-4">
        <Avatar name={name} />
        <h2 className="text-xl font-semibold mt-2">{name}</h2>
        <p className="text-gray-500">{email}</p>
      </div>

      {/* Activity Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "myBlogs" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("myBlogs")}
        >
          My Blogs
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "savedBlogs" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("savedBlogs")}
        >
          Saved Blogs
        </button>
      </div>

      {/* Display Blogs Based on Selected Tab */}
      <div className="bg-gray-100 p-4 rounded-lg">
        {activeTab === "myBlogs" ? <MyBlogs /> : <SavedBlogs />}
      </div>
    </div>
  );
}

/* ✅ Avatar Component */
function Avatar({ name }: { name: string }) {
  return (
    <div className="w-14 h-14 flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
      {name[0].toUpperCase()}
    </div>
  );
}

/* ✅ My Blogs Section */
function MyBlogs() {
  return <p className="text-gray-600 text-center">📖 List of blogs you've written...</p>;
}


function SavedBlogs() {
  return <p className="text-gray-600 text-center">🔖 List of blogs you've saved...</p>;
}
