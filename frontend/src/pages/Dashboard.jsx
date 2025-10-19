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
    <div className="dashboard-container">
      <div className="dashboard-overlay">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h1>📚 Library Dashboard</h1>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

          <div className="add-book-section">
            <h2>Add a New Book</h2>
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
              <button type="submit" className="add-btn">Add Book</button>
            </form>
          </div>

          <div className="book-list-section">
            <h2>Available Books</h2>
            {books.length > 0 ? (
              <ul>
                {books.map((book) => (
                  <li key={book._id}>
                    <span>
                      <b>{book.title}</b> — {book.author}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBook(book._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No books added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
