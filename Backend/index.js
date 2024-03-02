const express = require("express")
const router  = express.Router()
const cors = require("cors")
const {generateFile} = require("./generateFile")
const {executePython} = require("./executePython")
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true})) 
app.use(express.json())

app.get("/",(req,res) => {
    res.send("hi")
})

app.post("/run", async (req, res, next) => {
    const { language, code } = req.body;

    if (code === undefined) {
        return res.json({ error: "Empty Code Body" });
    }

    try {
        const filepath = await generateFile(language, code);
        const output = await executePython(filepath);
        return res.json({ filepath, output });
    } catch (err) {
        // Check if the error contains output
        if (err.output) {
            return res.json({ error: err.output });
        } else {
            return res.json({ error: err.message });
        }
    }
});


app.listen(5000, () => {
    console.log("App is on port 5000")
})