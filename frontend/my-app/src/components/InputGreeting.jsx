import { useState } from "react";

function InputGreeting() {
    const [name, setName] = useState("");
    return (
        <div style = {{ textAlign: "center", marginTop: "1rem"}}>
            <input value={name} onChange={(e) => setName(e.target.value)}placeholder="Type your name"/>
            <p>Hello, {name || "Guest"}</p>
        </div>
    );
}

export default InputGreeting;