import React from 'react'
import { useState } from 'react'
import axios from "axios"

const Ide = () => {
    const [code,setCode] = useState("")
    const handleSubmit = async ()=> {
        const data = {
            language : "py",
            code        }
       const output = await axios.post("http://localhost:5000/run",data)
       console.log(output.data.output)
        
    }
  return (
    <div>
        <h1>Online Code Compiler</h1>
        <textarea name="" id="" cols="75" rows="20" onChange={(e) => {
            setCode(e.target.value)
        }} ></textarea><br />7
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Ide