import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Menu } from "lucide-react";
import "./Header.css";

export default function Header({ searchTerm, onSearchChange }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/create");
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <button
              className="menu-button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="menu-icon" />
            </button>
            <h1 className="header-title">Catálogo de Livros</h1>
          </div>
          <div className="header-right">
            <div className="search-container">
              <input
                type="search"
                placeholder="Buscar livros..."
                className="search-input"
                value={searchTerm}
                onChange={onSearchChange}
              />
              <div className="search-icon-container">
                <Search className="search-icon" />
              </div>
            </div>
            <button className="add-book-button" onClick={handleClick}>
              Adicionar Livro
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
