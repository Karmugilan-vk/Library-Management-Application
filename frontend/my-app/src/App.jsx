import Header from "./components/Header";
import TodoList from "./components/TodoList";
import LoggedIn  from "./components/LoggedIn";
import Greeting from "./components/Greetings";
import Welcome from "./components/Welcome";
import Counter from "./components/Counter";
import InputGreeting from "./components/InputGreeting";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Header />
    <Counter />
    <Greeting name = "Karmugilan" />
    <InputGreeting />
    <TodoList />
    <LoggedIn isLoggedIn={true} />
     <Welcome />
    <Footer />
    </>
  );
}

export default App;