import { useState } from "react";
import axios from 'axios';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
export const Landing = () => {
    const [tab, setTab] = useState<"preview" | "code">("code");
    const [text, settext] = useState("");
    const [code, setcode] = useState("");
    const [loading, setloading] = useState<boolean>(false);

    return (
        <div className="flex h-screen bg-blue-900">
            <div className="w-[20%] bg-blue-300 p-4 flex flex-col gap-4">
                <input placeholder={"Describe your UI..."} value={text} onChange={(e) => { settext(e.target.value) }} className="w-full h-32 bg-black text-white px-4 py-2 rounded-md outline-none" />
                <button onClick={async () => {
                    setloading(true);
                    if (!text.trim()) return;
                    try {
                        setcode("");
                        const res = await axios.post("http://localhost:3000/api/v1/generate", {
                            text
                        });

                        setcode(res.data.code);

                    } catch (err) {
                        console.error(err);
                    } finally {
                        setloading(false);
                        console.log("code ran")
                    }
                }} className="bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer transition" >
                    Generate your component
                </button>
                <p>try an example:</p> <p onClick={() => settext("make a card")} className="border rounded border-black bg-black text-white">
                    make a card
                </p>
                <p onClick={() => settext("make a login page")} className="border rounded border-black" >
                    make a login page
                </p>
                <p onClick={() => settext("make a landing page")} className="border rounded border-black">
                    make a landing page
                </p>
                <p onClick={() => settext("make a cart component")} className="border rounded border-black">
                    make a cart component
                </p>
            </div>

            <div id="middlecomponent" className="w-[60%] bg-white text-center p-6 rounded shadow-md flex flex-col">
                <div>
                    <button onClick={()=>setTab("code")} className="bg-blue-500 w-[50%]"> code</button>
                    <button onClick={()=>setTab("preview")} className="bg-red-500 w-[50%]"> preview</button>
                </div>
                <div >
                    {code == "" ? "preview panel " : tab=="code"? <CodeBlock code={code}></CodeBlock>:<iframe></iframe>}
                    {loading ? "loading......" : ""}   </div>

            </div>
            <div className="w-[20%] bg-blue-200 flex items-center justify-center font-weight: 1000">
                Gallery-comming soon
            </div> 
        </div>
    );
}


function CodeBlock({ code }: { code: string }) {
    return (

        <SyntaxHighlighter customStyle={{
            height: "900px",
            width: '100%',
            margin: 0,
            overflowY: "auto",
            fontSize: "14px",
        }} language="jsx">
            {code}
        </SyntaxHighlighter>
        /* <iframe
src="https://100xmobile.com"
className="w-full h-[500px] border"
/> */

    );
}