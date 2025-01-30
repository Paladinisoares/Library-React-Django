import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

export default function BookForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [bookSuggestions, setBookSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publication_year: "",
    summary: "",
    coverUrl: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      if (formData.title.length < 3) return;

      setSearchLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/books/external-search`,
          {
            params: { search: formData.title },
          }
        );
        setBookSuggestions(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setSearchLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchBooks, 300);
    return () => clearTimeout(debounceFetch);
  }, [formData.title]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/books",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        navigate("/");
      } else {
        console.error(
          "Erro ao cadastrar livro:",
          response.status,
          response.statusText
        );
        alert("Erro ao cadastrar livro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
    }
    setLoading(false);
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <CardHeader
        title={<Typography variant="h5">Cadastrar Novo Livro</Typography>}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Campo de título com Autocomplete */}
          <Autocomplete
            freeSolo
            options={bookSuggestions}
            getOptionLabel={(option) => option.title}
            loading={searchLoading}
            onChange={(event, newValue) => {
              if (newValue) {
                setFormData({
                  title: newValue.title,
                  author: newValue.author,
                  coverUrl: newValue.coverUrl,
                  publication_year: newValue.publication_year,
                  genre: newValue.genre,
                  summary: newValue.summary,
                  external_id: newValue.external_id,
                });
              }
            }}
            renderOption={(props, option) => (
              <li
                {...props}
                key={option.external_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                }}
              >
                {option.coverUrl && (
                  <img
                    src={option.coverUrl}
                    alt={option.title}
                    style={{
                      width: 40,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                )}
                {option.title}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {searchLoading ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
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
            {loading ? "Cadastrando..." : "Cadastrar Livro"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
