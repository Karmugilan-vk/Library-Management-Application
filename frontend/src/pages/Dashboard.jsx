import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
   const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to load books");
    }
  };

   const addBook = async (e) => {
    e.preventDefault();
    try {
      await API.post("/books", { title, author });
      alert("Book added successfully");
      setTitle("");
      setAuthor("");
      fetchBooks(); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add book");
    }
  };

   const deleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await API.delete(`/books/${id}`);
        alert("Book deleted successfully");
        fetchBooks();
      } catch (error) {
        alert("Failed to delete book");
      }
    }
  };

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

 useEffect(() => {
    fetchBooks();
  }, []);

     useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

   return (
    <div className="container">
      <h2>Welcome to Dashboard</h2>
      <p>You're successfully logged in!</p>
      <button onClick={handleLogout}>Logout</button>

      <h3>Add a New Book</h3>
      <form onSubmit={addBook}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <h3>Book List</h3>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <b>{book.title}</b> — {book.author}
              <button onClick={() => deleteBook(book._id)}> Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books added yet</p>
      )}
    </div>
  );
}
export default Dashboard;
