import React from "react";
import { Box, Typography, Link, TextField, Button, Grid } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "2rem 1rem",
        marginTop: "30px",
        borderTop: "1px solid #ddd",
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* BlogHub Logo and Description */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            <h3>BLOGSITE</h3>
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
            Empowering voices, connecting ideas, and inspiring the world through
            the art of blogging.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Box sx={{ marginTop: "0.5rem" }}>
            <Link href="/" underline="none" color="inherit" display="block">
              Home
            </Link>
            <Link href="/create-blog" underline="none" color="inherit" display="block">
              Create Blog
            </Link>
            <Link href="/resources" underline="none" color="inherit" display="block">
              Resources
            </Link>
            <Link href="/writing-tips" underline="none" color="inherit" display="block">
              Writing Tips
            </Link>
            <Link href="/seo-guide" underline="none" color="inherit" display="block">
              SEO Guide
            </Link>
            <Link href="/community-guidelines" underline="none" color="inherit" display="block">
              Community Guidelines
            </Link>
          </Box>
        </Grid>

        

        {/* Stay Connected */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Stay Connected
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
            Enter your email
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              marginTop: "0.5rem",
              gap: "0.5rem",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Your email"
              fullWidth
            />
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom Text */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: "2rem",
          borderTop: "1px solid #ddd",
          paddingTop: "1rem",
        }}
      >
        <Typography variant="body2">© 2024 BLOGSITE. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
