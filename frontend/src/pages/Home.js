import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importing SweetAlert2 for notifications
import "../App.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline"; // Importing icons from Heroicons

function Home() {
  // State and variables initialization
  const { user } = useAuthContext(); // Using custom hook to get authentication context
  const [title, setTitle] = useState(""); // State for PDF title input field
  const [pdfs, setPDFs] = useState([]); // State to store list of PDFs
  const [file, setFile] = useState(null); // State to store selected PDF file
  const [error, setError] = useState(""); // State to manage error messages
  const navigate = useNavigate(); // Hook for navigation in React Router

  // Effect to fetch PDFs when user changes
  useEffect(() => {
    if (user) {
      fetch("/api/pdf", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then((data) => setPDFs(data));
    }
  }, [user]);

  // Handle file selection for upload
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
      return;
    }
    if (selectedFile && selectedFile.size > 30 * 1024 * 1024) {
      // 30MB
      setError("File size must be less than 30MB.");
      setFile(null);
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  // Handle form submission to upload PDF
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("title", title);

    // Sending POST request to upload PDF
    const response = await fetch("/api/pdf/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    // Handling successful upload
    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: `The file "${title}" has been uploaded successfully.`,
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear form inputs and fetch updated PDF list
      setTitle("");
      setFile(null);
      setError("");

      if (user) {
        fetch("/api/pdf", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
          .then((res) => res.json())
          .then((data) => setPDFs(data));
      }
    } else {
      setError("There was an error uploading the file.");
    }
  };

  // Handle deletion of PDF file
  const onDelete = async (id) => {
    // Confirmation dialog using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Sending DELETE request to delete PDF
        fetch(`/api/pdf/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }).then(() => {
          // Fetch updated PDF list after deletion
          if (user) {
            fetch("/api/pdf", {
              headers: { Authorization: `Bearer ${user.token}` },
            })
              .then((res) => res.json())
              .then((data) => setPDFs(data));
          }
        });

        // Show success message after deletion
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-image">
      <div className="grow-0">
        <NavBar />
      </div>

      <div className="grow">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-between max-w-2xl p-5 mx-auto mt-10 bg-gray-900 rounded-full"
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center justify-center gap-3">
              <label
                htmlFor="title"
                className="block text-sm font-bold leading-6 text-white"
              >
                Title :
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="File Title"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#454545] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label className="block cursor-pointer">
                <input
                  type="file"
                  onChange={onFileChange}
                  className="block w-full text-sm cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                />
              </label>
            </div>
            <button
              type="submit"
              className="flex items-center gap-3 py-2 pl-2 pr-3 text-sm font-medium text-white rounded-full shadow-sm hover:bg-violet-400 group bg-violet-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
              </svg>
              Upload PDF
            </button>
          </div>
          <div className="items-center justify-center mx-auto">
            <span className="mt-2 text-sm text-white">
              *Only PDF files are allowed. Maximum size: 30MB
            </span>
            {error && (
              <div className="items-center justify-center mx-auto mt-1 text-sm text-red-500">
                {error}
              </div>
            )}
          </div>
        </form>

        <div className="mx-5 my-10 max-h-[350px] overflow-hidden rounded-2xl">
          <div className="table-wrapper overflow-y-auto max-h-[350px]">
            <table className="w-full text-sm text-left text-gray-500 rounded-lg dark:text-gray-400">
              <thead className="sticky top-0 text-xs text-gray-700 uppercase rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    File Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pdfs.length === 0 ? (
                  <tr className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-sm text-center text-gray-500"
                    >
                      No files found.
                    </td>
                  </tr>
                ) : (
                  pdfs.map((pdf, index) => (
                    <tr
                      key={pdf._id}
                      className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {pdf.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(pdf.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/pdf/${pdf._id}`}
                          className="px-4 py-2 text-sm font-medium text-green-600 transition duration-300 rounded-lg hover:bg-green-600 hover:text-white"
                        >
                          <EyeIcon
                            className="h-5 w-5 mr-1 inline-block -mt-0.5"
                            aria-hidden="true"
                          />
                          View File
                        </Link>

                        <button
                          onClick={() => onDelete(pdf._id)}
                          className="px-4 py-2 ml-4 text-sm font-medium text-red-600 transition duration-300 rounded-lg hover:bg-red-600 hover:text-white"
                        >
                          <TrashIcon
                            className="h-5 w-5 mr-1 inline-block -mt-0.5"
                            aria-hidden="true"
                          />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grow-0">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
