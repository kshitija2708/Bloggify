import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupInput } from 'input-variables-blog'; // Ensure this package is installed
import axios from "axios";
import { BACKEND_URL } from "../config"; // Ensure BACKEND_URL is defined in your config

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        name: "",
        password: ""
    });
    const [loading, setLoading] = useState(false); // State to manage loading

    async function sendRequest() {
        setLoading(true); // Set loading to true when the request starts
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = res.data.jwt;
            localStorage.setItem('token', jwt);
            navigate('/blogs');
        } catch (e) {
            console.error(e);
            window.alert('Error signing in. Please try again.'); // Improved error message
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <div className="bg-slate-100 h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold ">{type === "signup" ? "Create An Account" : "Sign In"}</div>
                    <div>
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="underline" to={type === "signup" ? '/signin' : "/signup"}>
                            {type === "signup" ? " Login" : " Sign Up"}
                        </Link>
                    </div>
                    <div className="pt-2">
                        <LabelledInput
                            label={"Email"}
                            placeholder={"johndoe@gmail.com"}
                            onChange={(e) => {
                                setPostInputs((prev) => ({
                                    ...prev,
                                    email: e.target.value
                                }));
                            }} 
                            type={"email"} 
                        />
                        {type === 'signup' ? (
                            <LabelledInput
                                label={"Username"}
                                placeholder={"john_doe"}
                                onChange={(e) => {
                                    setPostInputs((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }));
                                }} 
                                type={"text"} 
                            />
                        ) : null}
                        <LabelledInput
                            label={"Password"}
                            placeholder={"*********"}
                            onChange={(e) => {
                                setPostInputs((prev) => ({
                                    ...prev,
                                    password: e.target.value
                                }));
                            }} 
                            type={"password"} // Changed to password
                        />
                    </div>
                    <div className="pt-4 ">
                        <button 
                            onClick={sendRequest} 
                            type="button" 
                            className="w-full bg-gradient-to-r from-blue-400 to-purple-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Loading..." : (type === "signup" ? "Sign Up" : "Sign In")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-black">{label}</label>
            <input 
                onChange={onChange} 
                placeholder={placeholder} 
                type={type} 
                className="bg-gray-200 border border-gray-600 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </div>
    );
}