import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publication_year: "",
    summary: "",
    coverUrl: "",
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/books/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Erro ao buscar livro:", error);
      }
    };

    fetchBookData();
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/books/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        navigate("/");
      } else {
        console.error(
          "Erro ao atualizar livro:",
          response.status,
          response.statusText
        );
        alert("Erro ao atualizar livro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
    setLoading(false);
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <CardHeader title={<Typography variant="h5">Editar Livro</Typography>} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Autor"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Gênero"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ano de Publicação"
            name="publication_year"
            type="number"
            value={formData.publication_year}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Resumo"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            fullWidth
            label="URL da Capa (opcional)"
            name="coverUrl"
            type="url"
            value={formData.coverUrl}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            style={{ marginTop: 20 }}
          >
            {loading ? "Atualizando..." : "Atualizar Livro"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
