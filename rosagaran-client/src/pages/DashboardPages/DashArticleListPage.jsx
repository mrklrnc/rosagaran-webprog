import { useEffect, useState } from "react";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  deleteArticle,
  getStoredArticles,
  slugifyArticleName,
  upsertArticle,
} from "../../services/articleStore";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(720px, calc(100vw - 32px))",
  maxHeight: "90vh",
  overflowY: "auto",
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const emptyArticle = {
  title: "",
  name: "",
  excerpt: "",
  publishedAt: "",
  readTime: "",
  coverImage: "",
  coverAlt: "",
  content: "",
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState(() => getStoredArticles());
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [articleForm, setArticleForm] = useState(emptyArticle);

  const loadArticles = () => {
    setArticles(getStoredArticles());
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditingName("");
    setArticleForm(emptyArticle);
  };

  const handleOpenAdd = () => {
    handleClose();
    setOpen(true);
  };

  const handleEdit = (article) => {
    setArticleForm({
      ...article,
      content: Array.isArray(article.content) ? article.content.join("\n\n") : "",
    });
    setEditingName(article.name);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSave = () => {
    const name = articleForm.name || slugifyArticleName(articleForm.title);
    upsertArticle({ ...articleForm, name }, editingName);
    loadArticles();
    handleClose();
  };

  const handleDelete = (name) => {
    deleteArticle(name);
    loadArticles();
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1.4 },
    { field: "publishedAt", headerName: "Published", flex: 1 },
    { field: "readTime", headerName: "Read Time", flex: 0.8 },
    { field: "name", headerName: "Slug", flex: 1.2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" size="small" onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.name)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Articles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Changes here are also shown on the public Article List page.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleOpenAdd}>
          Add Article
        </Button>
      </Stack>

      <Box sx={{ height: 520, width: "100%", mt: 3 }}>
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={(row) => row.name}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {isEditing ? "Edit Article" : "Add Article"}
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              value={articleForm.title}
              onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
            />
            <TextField
              label="Slug"
              helperText="Leave blank to auto-generate from the title."
              value={articleForm.name}
              onChange={(e) => setArticleForm({ ...articleForm, name: e.target.value })}
            />
            <TextField
              label="Excerpt"
              multiline
              minRows={2}
              value={articleForm.excerpt}
              onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Published At"
                value={articleForm.publishedAt}
                onChange={(e) => setArticleForm({ ...articleForm, publishedAt: e.target.value })}
              />
              <TextField
                fullWidth
                label="Read Time"
                value={articleForm.readTime}
                onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
              />
            </Stack>
            <TextField
              label="Cover Image URL"
              value={articleForm.coverImage}
              onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })}
            />
            <TextField
              label="Cover Alt"
              value={articleForm.coverAlt}
              onChange={(e) => setArticleForm({ ...articleForm, coverAlt: e.target.value })}
            />
            <TextField
              label="Content"
              helperText="Separate paragraphs with blank lines."
              multiline
              minRows={8}
              value={articleForm.content}
              onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave}>
                {isEditing ? "Save Changes" : "Create Article"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashArticleListPage;
