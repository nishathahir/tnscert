import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import FileOpenIcon from "@mui/icons-material/FileOpen";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { chapters } from "../chaptersData";
import { useLocation } from "react-router-dom";

function ChapterPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Get query params
  const selectedClass = queryParams.get("class");

  // Define standards with chapter data for all classes
  const standards = chapters;

  const selectedStandard = standards.find(
    (standard) => standard.standard === `Class ${selectedClass}`
  );

  // State to handle dialog and selected PDF
  const [open, setOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const handleOpenPdf = (chapterNo) => {
    // Dynamically create the path to the PDF
    const pdfPath = `/pdfs/${
      selectedStandard.standard.replace("Class ", "").toLowerCase() + "th"
    }/Chapter(${chapterNo}).pdf`;

    console.log(pdfPath); // Log the path to ensure it's correct
    window.open(pdfPath, "_blank"); // Open the PDF in a new tab
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPdf(""); // Clear the selected PDF
  };

  return (
    <div>
      {selectedStandard ? (
        <>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              margin: "1rem",
              paddingLeft: "1rem",
              fontFamily: "sans-serif",
              fontWeight: "600",
              color: "#333333",
              fontSize: "1.65rem",
              textTransform: "uppercase",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {selectedStandard.standard}
          </Typography>
          <TableContainer
            component={Paper}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Table
              style={{
                padding: "1rem",
                margin: "1rem",
                border: "1px solid black",
                width: "95%",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Chapter No.</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Section</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Author</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedStandard.chapters.map((chapter) => (
                  <TableRow key={chapter.chapterNo}>
                    <TableCell>{chapter.chapterNo}</TableCell>
                    <TableCell>{chapter.section}</TableCell>
                    <TableCell>{chapter.title}</TableCell>
                    <TableCell>{chapter.author}</TableCell>
                    <TableCell>
                      <FileOpenIcon
                        sx={{
                          fontSize: "1.25rem",
                          marginRight: "10px",
                          color: "#595959",
                          cursor: "pointer",
                        }}
                        onClick={() => handleOpenPdf(chapter.chapterNo)}
                      />
                      <SmartDisplayIcon
                        sx={{ fontSize: "1.25rem", color: "#595959" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog to display the PDF */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>View Chapter PDF</DialogTitle>
            <DialogContent>
              {selectedPdf ? (
                <iframe
                  src={`/${selectedPdf}`} // Assuming the PDFs are served in public folder
                  width="100%"
                  height="600px"
                  title="Chapter PDF"
                />
              ) : (
                <Typography variant="h6">No PDF selected</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography variant="h6">No data available for this class.</Typography>
      )}
    </div>
  );
}

export default ChapterPage;
