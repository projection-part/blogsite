import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const isLoggedIn = !!localStorage.getItem('token');

function BlogPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories] = useState(["Book", "Technology", "Health"]);
  const [tags] = useState(["Book", "Tech", "Lifestyle", "Self Help"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const theme = useTheme();

  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");

    const categoryQuery = selectedCategory ? `category=${selectedCategory}` : "";
    const tagsQuery = selectedTags.length
      ? `tags=${selectedTags.join(",")}`
      : "";

    const query = [categoryQuery, tagsQuery].filter(Boolean).join("&");

    try {
      const response = await fetch(
        `https://bloghub-1cq5.onrender.com/blogs?${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": localStorage.getItem("token"), // Token for authentication
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        setBlogs(data.data);
        setLoading(false);
      } else {
        setError(data.msg || "Failed to fetch blog posts.");
        setBlogs([]);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, selectedTags]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === "string" ? value.split(",") : value);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedTags([]);
    fetchBlogs();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Blog Posts
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Category" />}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="tags-select-label">Tags</InputLabel>
            <Select
              labelId="tags-select-label"
              multiple
              value={selectedTags}
              onChange={handleTagChange}
              input={<OutlinedInput label="Tags" />}
              MenuProps={MenuProps}
            >
              {tags.map((tag) => (
                <MenuItem
                  key={tag}
                  value={tag}
                  style={{
                    fontWeight: selectedTags.includes(tag)
                      ? theme.typography.fontWeightMedium
                      : theme.typography.fontWeightRegular,
                  }}
                >
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>

      {/* Blog List */}
      <Grid container spacing={3}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <Card>
                
                <CardContent>
                  <Typography variant="h6" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {blog.body.slice(0, 100)}...
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Category: {blog.category}
                  </Typography>
                </CardContent>
                <Box
                   sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                <CardActions>
                  <Button size="small" onClick={() => navigate('/read-more')}>Read More</Button>
                </CardActions>

                {isLoggedIn && (
              <>
              <CardActions>
                  <Button size="small" onClick={() => navigate(`/blogs/update/${blog._id}?authorId=${blog.authorId}`)}>Update or Delete</Button>
                </CardActions>
            </>
            )}
            </Box>
                
                
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No blogs found.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default BlogPosts;
