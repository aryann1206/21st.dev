import express from "express";
const router = express.Router();
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

router.post("/generate", async (req, res) => {
    try {
        let { text } = req.body;
        if (text == null) {
            res.status(400).json({
                message: "cannot be a empty input"
            })
            return;
        }
        console.log("hyyyyyyyy")
        console.log(process.env.GEMINI_API_KEY);
        const result = await model.generateContent(`
            Return ONLY raw JSX.
            - No markdown
            - No imports/exports
            - Single component
            - use tailwind only dont use raw css
            ${text}
            `);     
            console.log("hyyyyyyyy  gcdugogcdoogcp")
        const response = await result.response;
        const code = response.text();

        const clean = code
            .replace(/```jsx|```js|```/g, "")
            .replace(/import .* from .*/g, "")
            .replace(/export default/g, "")
            .trim();

        res.status(200).json({
            code: clean
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "error try again later"
        })
    }
})

export default router;