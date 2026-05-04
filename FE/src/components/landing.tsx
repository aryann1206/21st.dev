import { useState } from "react";
import axios from "axios";

import { MiddleCompo } from "./middlecomponent";
import { RightCompo } from "./rightcompo";

export const Landing = () => {
  const [text, settext] = useState("");
  const [code, setcode] = useState("");
  const [loading, setloading] = useState<boolean>(false);

  const generate = async () => {
    if (!text.trim()) return;

    setloading(true);
    try {
      setcode("");

      const res = await axios.post(
        "http://localhost:3000/api/v1/generate",
        { text }
      );

      setcode(res.data.code);
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex h-screen gap-6 p-6">

      {/* LEFT PANEL */}
      <div className="w-[20%] surface depth-tilt p-4 flex flex-col gap-4">

        <input
          placeholder="Describe your UI..."
          value={text}
          onChange={(e) => settext(e.target.value)}
          className="
            w-full h-32 
            bg-black/40 
            backdrop-blur-md
            border border-white/10 
            text-white 
            px-4 py-3 
            rounded-xl 
            outline-none
            focus:border-[var(--color-primary)]
          "
        />

        <button
          onClick={generate}
          className="
            bg-[var(--color-primary)] 
            text-black 
            py-2 
            rounded-xl 
            transition
            hover:scale-105
            active:scale-95
            disabled:opacity-50
          "
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate UI"}
        </button>

        <p className="text-sm text-[var(--color-muted)]">
          Try a prompt
        </p>

        {[
          "make a card",
          "make a login page",
          "make a landing page",
          "make a cart component",
        ].map((item) => (
          <button
            key={item}
            onClick={() => settext(item)}
            className="
              text-left 
              border border-white/10 
              rounded-lg 
              px-3 py-2 
              bg-white/5
              hover:bg-white/10
              transition
            "
          >
            {item}
          </button>
        ))}
      </div>

      {/* MIDDLE */}
      <MiddleCompo code={code} loading={loading} />

      {/* RIGHT */}
      <RightCompo />
    </div>
  );
};
