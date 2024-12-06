import React, { useEffect, useState } from "react";

import pdfToText from "react-pdftotext";

function PDFParserReact({ pdfPath }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const extractText = async () => {
      if (!pdfPath) {
        setError("No PDF path provided.");
        return;
      }

      try {
        const response = await fetch(pdfPath);
        const fileBlob = await response.blob();
        const text = await pdfToText(fileBlob);
        setText(text);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to extract text from the PDF.");
        setText("");
      }
    };

    extractText();
  }, [pdfPath]);

  return (
    <div>
      <h2>PDF Text Extractor</h2>
      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {text && (
          <div>
            <h3>Extracted Text:</h3>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                background: "#f4f4f4",
                padding: "10px",
              }}
            >
              {text}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFParserReact;
