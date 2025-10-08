import { useEffect} from "react";

function Welcome() {
    useEffect(() => {
        console.log("Welcome component mounted");
    }, []);
    return <h3 style = {{ textAlign: "center", marginTop: "1rem"}}>Welcome Component Loaded</h3>;
}

export default Welcome;