import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";

function ProfilePage() {
  

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Profile: 
      </Typography>

        <Box>
        <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Profile Picture:</Typography>
              <img
                src="pic.jpg"
                alt="Profile"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </Box>
          <Typography variant="h6">Name: </Typography>
          <Typography variant="h6">Email: </Typography>
          <Typography variant="h6">User ID: </Typography>
        </Box>
    </Box>
  );
}

export default ProfilePage;
