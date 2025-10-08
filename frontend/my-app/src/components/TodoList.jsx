function TodoList() {
    const todos = ["Learn React", "Build a Project", "Code Daily"];
    return (
        <ul style = {{ listStylePosition:"inside",paddingLeft: 0,textAlign: "center"}}>
            {todos.map((todo, idx) => (
                <li key={idx}style={{margin:"5px 0"}}>{todo}</li>
            ))}
        </ul>
    );
}

export default TodoList;