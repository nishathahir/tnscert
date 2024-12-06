import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ChapterPage from "./pages/ChapterPage";
import Grades from "./pages/Grades";
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Grades />} />
        <Route path="/chapter" element={<ChapterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
