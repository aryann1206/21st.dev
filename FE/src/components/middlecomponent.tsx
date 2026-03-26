import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
export const MiddleCompo = ({code,loading}:{code:string,loading:boolean}) => {
    const [tab, setTab] = useState<"preview" | "code">("code");
    //const [text, settext] = useState("");
    //const [code, setcode] = useState("");
    //const [loading, setloading] = useState<boolean>(false);

    return (
        <div id="middlecomponent" className="w-[60%] bg-white text-center p-6 rounded shadow-md flex flex-col">
            <div>
                <button onClick={() => setTab("code")} className="bg-blue-500 w-[50%]"> code</button>
                <button onClick={() => setTab("preview")} className="bg-red-500 w-[50%]"> preview</button>
            </div>
            <div >
                {code == "" ? "preview panel " : tab == "code" ? <CodeBlock code={code}></CodeBlock> : <iframe className="w-[90%] h-[500%] max-w-5xl flex justify-center items-center rounded-xl border shadow-lg bg-white"
                    sandbox="allow-scripts" srcDoc={buildSrcdoc(code)}></iframe>}
                {loading ? "loading......" : ""}   </div>

        </div>
    )
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

    );
}


export const buildSrcdoc = (jsxCode: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; background: white; }
    .error-display { color: #ef4444; padding: 16px; font-family: monospace; font-size: 14px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    try {
      const Component = () => { return(${jsxCode}) };

      
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Component));
    } catch (err) {
      document.getElementById('root').innerHTML = '<div class="error-display">Render error: ' + err.message + '</div>';
    }
  </script>
  <script>
    window.onerror = function(msg) {
      document.getElementById('root').innerHTML = '<div class="error-display">Error: ' + msg + '</div>';
    };
  </script>
</body>
</html>`;