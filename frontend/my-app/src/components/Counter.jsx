import { useState }  from "react";

function Counter() {
    const [count,setCount] = useState(0);

    return (
        <div style = {{ textAlign: "center", marginTop: "1rem"}}>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}

export default Counter;