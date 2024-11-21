"use client";

import axios from "axios";

export default function PDFPage() {
  const downloadPDF = async () => {
    try {
      // Make a GET request to the API endpoint to fetch the PDF
      const response = await axios.get("/api/generate-pdf", {
        responseType: "blob", // Ensures the response is treated as a binary file (Blob)
      });

      // Create a Blob URL from the PDF data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "example.pdf"); // Specify the filename
      document.body.appendChild(link); // Append link to the DOM
      link.click(); // Trigger the download
      link.remove(); // Clean up the DOM
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div>
      <h1>Generate PDF</h1>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}
