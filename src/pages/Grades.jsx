import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import React from "react";
import { scale } from "pdf-lib";
import { useNavigate } from "react-router-dom";

function Grades() {
  const grades = [
    { label: "6th Standard", value: "6" },
    { label: "7th Standard", value: "7" },
    { label: "8th Standard", value: "8" },
    { label: "9th Standard", value: "9" },
  ];

  const navigate = useNavigate();

  const handleCardClick = (grade) => {
    navigate(`/chapter?class=${grade.value}`); // Pass the class as a query parameter
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          padding: "1.85rem",
          height: "150px",
          backgroundColor: "#cce5ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src="/tn-logo.png" alt="Logo" style={{ height: "100px" }} />
        <Typography
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "600",
            color: "#005505",
            fontSize: {
              xs: "1.25rem",
              md: "2.25rem",
            },
            marginLeft: "12px",
          }}
        >
          Fundamental Computers and Artificial Intelligence
        </Typography>
      </Box>

      <Box sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          {grades.map((grade, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleCardClick(grade)}
                sx={{
                  height: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #d9d9d9",
                  boxShadow: "0",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: "1rem" }}>
                    {grade.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Grades;
