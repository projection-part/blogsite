import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CreateBlogPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [message, setMessage] = useState("");

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return payload.userId;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorId = getUserIdFromToken();
    console.log("dzsf userIDD",authorId);
    if (!authorId) {
      setMessage("User ID not found. Please log in again.");
      return;
    }

    const blogData = {
      title,
      body,
      authorId,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags to array
      category,
      subcategory: subcategory.split(",").map((sub) => sub.trim()), // Convert to array
    };

    try {
      const response = await fetch("https://bloghub-1cq5.onrender.com/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": localStorage.getItem("token"), // Add token for authentication
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Blog post created successfully!");
      } else {
        setMessage(data.msg || "Error creating blog post.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Create Blog Post
      </Typography>
      {message && (
        <Typography variant="body1" color="primary" gutterBottom>
          {message}
        </Typography>
      )}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { mb: 2, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          id="body"
          label="Body"
          variant="outlined"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <TextField
          id="tags"
          label="Tags (comma-separated)"
          variant="outlined"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <TextField
          id="category"
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <TextField
          id="subcategory"
          label="Subcategory (comma-separated)"
          variant="outlined"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default CreateBlogPost;
