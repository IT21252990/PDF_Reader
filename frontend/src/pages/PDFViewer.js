import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { useAuthContext } from "../hooks/useAuthContext";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const { id } = useParams();
  const { user } = useAuthContext();
  const [pdf, setPDF] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        if (user) {
          const response = await fetch(`/api/pdf/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Assuming the response is the URL of the PDF file
          const data = await response.json();
          setPDF(data.filename); // Set the URL of the PDF file
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPDF();
  }, [id, user]);

  console.log(pdf);
  console.log(id);
  console.log(numPages);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };


  return (
    <div>
      <h1>PDF Viewer</h1>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="w-96 h-96 bg-black">
         <Document file={`/uploads/${pdf}`} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
      </div>
     
    </div>
  );
};

export default PDFViewer;
