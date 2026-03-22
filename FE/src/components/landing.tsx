import { useState } from "react";
import axios from 'axios'
export const Landing = () => {

    const [text, settext] = useState("");
    const [code, setcode] = useState("");

    return (
        <div className="flex h-screen bg-blue-900">
            <div className="w-[20%] bg-blue-300 p-4 flex flex-col gap-4">
                <input placeholder={"Describe your UI..."} value={text} onChange={(e) => { settext(e.target.value) }} className="w-full h-32 bg-black text-white px-4 py-2 rounded-md outline-none" />
                <button onClick={async () => {
                    if (!text.trim()) return;
                    try {
                        const res = await axios.post("http://localhost:3000/api/v1/generate", {
                            text
                        });

                        setcode(res.data.code);

                    } catch (err) {
                        console.error(err);
                    } finally {
                        console.log("code ran")
                    }
                }} className="bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer transition" >
                    Generate your component
                </button>
                <p>try an example:</p> <p onClick={() => settext("mark a card")} className="border rounded border-black bg-black text-white">
                    mark a card
                </p>
                <p onClick={() => settext("mark a login page")} className="border rounded border-black" >
                    mark a login page
                </p>
                <p onClick={() => settext("mark a landing page")} className="border rounded border-black">
                    mark a landing page
                </p>
                <p onClick={() => settext("mark a cart component")} className="border rounded border-black">
                    mark a cart component
                </p>
            </div>
            <div className="w-[60%] bg-white text-center p-6 rounded shadow-md flex items-center justify-center">
                {code == "" ? "preview panel" : code}
            </div>
            <div className="w-[20%] bg-blue-200 flex items-center justify-center font-weight: 1000">
                Gallery-comming soon
            </div>
        </div>
    );
}