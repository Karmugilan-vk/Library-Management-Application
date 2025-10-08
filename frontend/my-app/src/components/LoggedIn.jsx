function LoggedIn({ isLoggedIn }) {
    return <div style={{ textAlign: "center"}}>{isLoggedIn ? "Welcome Back!" : "Please Log In"}</div>;
}

export default LoggedIn;