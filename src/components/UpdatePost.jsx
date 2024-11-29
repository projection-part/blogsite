


import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function UpdatePost() {
  const { id, } = useParams(); // Get blog ID and author ID from the route
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const authorId = queryParams.get("authorId"); // Extract authorId from query params

  if (!authorId) {
    console.error("Author ID is missing.");
  }

  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
    tags: "",
    category: "",
    subcategory: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch blog details
  const fetchBlogDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://bloghub-1cq5.onrender.com/blogs", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const blogs = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const blogList = Array.isArray(blogs) ? blogs : blogs.data; // Handle both array and object formats
      const blog = blogList.find((item) => item._id === id);

      if (!blog) {
        setError("Blog not found");
        return;
      }

      setFormValues({
        title: blog.title,
        body: blog.body,
        tags: blog.tags.join(", "),
        category: blog.category,
        subcategory: blog.subcategory.join(", "),
      });
    } catch (err) {
      setError("An error occurred while fetching blog details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Update blog
  const updateBlog = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://bloghub-1cq5.onrender.com/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ...formValues,
            tags: formValues.tags.split(",").map((tag) => tag.trim()),
            subcategory: formValues.subcategory
              .split(",")
              .map((sub) => sub.trim()),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        setSuccess("Blog post updated successfully!");
        setTimeout(() => navigate("/"), 2000); // Redirect after success
      } else {
        setError(data.message || "Failed to update the blog post.");
      }
    } catch (err) {
      setError("An error occurred while updating the blog.");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog by _id
  const deleteBlogById = async () => {
    if (!id) {
      setError("Blog ID is missing. Cannot delete blog.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://bloghub-1cq5.onrender.com/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        setSuccess("Blog post deleted successfully!");
        setTimeout(() => navigate("/"), 2000); // Redirect after success
      } else {
        setError(data.message || "Failed to delete the blog post.");
      }
    } catch (err) {
      setError("An error occurred while deleting the blog.");
    } finally {
      setLoading(false);
    }
  };

  // Delete blogs by authorId
  const deleteBlogByAuthorId = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
  
    if (!authorId) {
      setError("Author ID is missing. Cannot delete blogs.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(
        `https://bloghub-1cq5.onrender.com/blogs?authorId=${authorId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": localStorage.getItem("token"),
          },
        }
      );
  
      const data = await response.json();
      if (response.ok && data.status) {
        setSuccess("All blogs by the author deleted successfully!");
        setTimeout(() => navigate("/"), 2000); // Redirect after success
      } else {
        setError(data.message || "Failed to delete blogs by the author.");
      }
    } catch (err) {
      console.error("Error deleting blogs by author:", err);
      setError("An error occurred while deleting blogs by the author.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Update Blog Post
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {!loading && !error && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateBlog();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Body"
                name="body"
                value={formValues.body}
                onChange={handleChange}
                required
                multiline
                rows={6}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                name="tags"
                value={formValues.tags}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formValues.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subcategory (comma-separated)"
                name="subcategory"
                value={formValues.subcategory}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update Blog
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
                onClick={deleteBlogById}
                fullWidth
              >
                Delete Blog by ID
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteBlogByAuthorId}
                fullWidth
              >
                Delete Blogs by Author
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
}

export default UpdatePost;
