function Greeting({ name = "Guest"}) {
    return <h2 style = {{ textAlign: "center"}}>Hello, {name}!</h2>;
}

export default Greeting