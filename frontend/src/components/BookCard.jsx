import "./BookCard.css";
import { useNavigate } from "react-router-dom";

export default function BookCard({ id, title, author, genre, coverUrl }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("Erro ao excluir livro");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="book-card">
      <div className="book-card-content">
        <div className="book-card-image-container">
          <img
            src={coverUrl || "/placeholder.svg"}
            alt={`Capa do livro ${title}`}
            layout="fill"
            objectFit="cover"
            className="book-card-image"
          />
        </div>
        <h3 className="book-card-title">{title}</h3>
        <p className="book-card-author">{author}</p>
        <p className="book-card-genre">{genre}</p>
      </div>
      <div className="book-card-footer">
        <button className="book-card-button" onClick={handleEdit}>
          Ver / Editar Detalhes
        </button>
        <button className="book-card-delete" onClick={() => handleDelete()}>
          Excluir
        </button>
      </div>
    </div>
  );
}
