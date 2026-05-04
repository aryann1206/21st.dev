import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export const MiddleCompo = ({
  code,
  loading,
}: {
  code: string;
  loading: boolean;
}) => {
  const [tab, setTab] = useState<"preview" | "code">("code");

  return (
    <div className="w-[60%] elevated p-6 flex flex-col gap-4">

      {/* TABS */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("code")}
          className={`flex-1 py-2 rounded-lg transition ${
            tab === "code"
              ? "bg-[var(--color-primary)] text-black"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          Code
        </button>

        <button
          onClick={() => setTab("preview")}
          className={`flex-1 py-2 rounded-lg transition ${
            tab === "preview"
              ? "bg-[var(--color-primary)] text-black"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          Preview
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex justify-center items-start">

        {code === "" ? (
          <p className="text-[var(--color-muted)] mt-10">
            Preview panel
          </p>
        ) : tab === "code" ? (
          <div className="surface p-4 w-full overflow-hidden">
            <CodeBlock code={code} />
          </div>
        ) : (
          <iframe
            title="preview"
            className="
              w-full 
              h-[600px] 
              rounded-xl 
              border border-white/10 
              shadow-2xl 
              bg-white
            "
            sandbox="allow-scripts"
            srcDoc={buildSrcdoc(code)}
          />
        )}
      </div>

      {loading && (
        <p className="text-sm text-[var(--color-muted)]">
          Loading...
        </p>
      )}
    </div>
  );
};

function CodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      customStyle={{
        height: "600px",
        width: "100%",
        margin: 0,
        overflowY: "auto",
        fontSize: "14px",
        background: "transparent",
      }}
      language="jsx"
    >
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
    body {
      margin: 0;
      padding: 16px;
      font-family: system-ui;
      background: white;
    }
    .error {
      color: red;
      font-family: monospace;
      white-space: pre-wrap;
    }
  </style>
</head>

<body>
  <div id="root"></div>

  <script type="text/babel">
    try {
      const Component = () => (${jsxCode});
      ReactDOM.createRoot(document.getElementById("root"))
        .render(React.createElement(Component));
    } catch (err) {
      document.getElementById("root").innerHTML =
        "<div class='error'>" + err.message + "</div>";
    }
  </script>
</body>
</html>
`;
