import React, { useState } from 'react'
import axios from "axios"

const Ide = () => {
    const [code, setCode] = useState("")
    const [outcome, setOutcome] = useState("")

    const handleSubmit = async () => {
        const data = {
            language: "py",
            code: code
        }

        try {
            const response = await axios.post("http://localhost:5000/run", data)
            if (response.data.error) {
                setOutcome(response.data.error)
            } else {
                setOutcome(response.data.output.output)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div>
            <h1>Online Code Compiler</h1>
            <textarea name="" id="" cols="75" rows="20" onChange={(e) => {
                setCode(e.target.value)
            }}></textarea><br />
            <button onClick={handleSubmit}>RUN</button>
            <div style={{width: "38vw"}}>
              <h2>Output</h2>
                <p>{outcome}</p>
            </div>
        </div>
    )
}

export default Ide
