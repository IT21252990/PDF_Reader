import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { useAuthContext } from "../hooks/useAuthContext";
import { pdfjs } from "react-pdf";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
       <h1 className="text-center mb-4">PDF Viewer</h1>
        <p className="text-center mb-4">
          Page {pageNumber} of {numPages}
        </p>
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-scroll h-[80vh]">
       
        <div className="w-full flex justify-center bg-black mx-auto p-4">
          <Document
            file={`/uploads/${pdf}`}
            onLoadSuccess={onDocumentLoadSuccess}
            className="space-y-4" // Adds space between the pages
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                size="A4"
                style={tw("p-12 font-sans")}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mb-4" // Adds space between the pages
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
