import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BookCard from "./components/BookCard";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async (searchQuery = "") => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/books/local-search?search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar livros");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchBooks(query);
  };

  return (
    <div className="app">
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="app-body">
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
