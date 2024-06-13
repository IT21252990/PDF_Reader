import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importing necessary hooks from React Router
import { Document, Page } from "react-pdf"; // Importing components from react-pdf library
import { useAuthContext } from "../hooks/useAuthContext"; // Custom hook for authentication context
import { pdfjs } from "react-pdf"; // Importing pdfjs from react-pdf
import Swal from "sweetalert2"; // Importing SweetAlert2 for notifications
import NavBar from "../components/NavBar"; // Importing Navbar component
import Footer from "../components/Footer"; // Importing Footer component
import { TrashIcon } from "@heroicons/react/24/outline"; // Importing TrashIcon from Heroicons
import "../App.css"; // Importing CSS styles

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = () => {
  // State initialization
  const [numPages, setNumPages] = useState(null); // State to store number of pages in PDF
  const [pageNumber, setPageNumber] = useState(1); // State to manage current page number
  const [pdf, setPDF] = useState(null); // State to store PDF filename
  const [fileInfo, setFileInfo] = useState(null); // State to store information about the PDF file

  // Fetching parameters from URL
  const { id } = useParams();
  const { user } = useAuthContext(); // Using custom hook to get authentication context
  const navigate = useNavigate(); // Hook for navigation in React Router

  // Effect to fetch PDF details from the server
  useEffect(() => {
    const fetchPDF = async () => {
      try {
        if (user) {
          // Fetching PDF details based on ID
          const response = await fetch(`/api/pdf/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          // Setting PDF details into state
          setPDF(data.filename);
          setFileInfo({
            title: data.title,
            fileName: data.filename,
            createdDate: new Date(data.createdAt).toLocaleDateString(), // Adjust this based on your API response
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPDF();
  }, [id, user]);

  // Function to handle successful loading of PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Function to handle deletion of PDF file
  const handleDelete = () => {
    // Confirmation dialog using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Sending DELETE request to delete PDF file
          const response = await fetch(`/api/pdf/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          // Handling successful deletion
          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
            }).then(() => {
              navigate("/"); // Navigate to home page after deletion
            });
          } else {
            // Error handling if deletion fails
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the file.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
          }
        } catch (error) {
          console.error("Delete error:", error);
          // Error handling if an error occurs during deletion process
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the file.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 bg-image">
      <div className="grow-0">
        <NavBar />
      </div>
      <div className="flex flex-col items-center gap-5 px-6 bg-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center justify-between w-full gap-4 p-5 mx-auto mt-2 mb-5 ml-5 mr-5 bg-gray-900 flow-row rounded-2xl">
        {fileInfo && (
            <div className="flex items-center gap-5 text-center">
              <h2 className="text-lg font-semibold text-gray-500">File Title: {fileInfo.title}</h2>
              <p className="text-lg font-semibold text-gray-500">
              Created Date: {fileInfo.createdDate}
              </p>
            </div>
          )}
          <button
            onClick={handleDelete}
            className="px-4 py-2 ml-4 text-sm font-medium text-red-600 transition duration-300 rounded-lg hover:bg-red-600 hover:text-white"
          >
            <TrashIcon className="h-5 w-5 mr-1 inline-block -mt-0.5" />
            Delete File
          </button>
        </div>
        <div className="max-w-max overflow-y-auto max-h-[470px]">
          <div className="justify-center mb-4 ">
            <Document
              file={`/uploads/${pdf}`}
              onLoadSuccess={onDocumentLoadSuccess}
              className="w-full"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="mb-4"
                />
              ))}
            </Document>
          </div>
        </div>
      </div>
      <div className="grow-0">
        <Footer />
      </div>
    </div>
  );
};

export default PDFViewer;
