import React, { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import "../App.css"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Home() {
  const { user } = useAuthContext();
  const [pdfs, setPDFs] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) {
      fetch("/api/pdf", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then((data) => setPDFs(data));
    }
  }, [user]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);

    await fetch("/api/pdf/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    if (user) {
      fetch("/api/pdf", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then((data) => setPDFs(data));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-image">
      <div className="grow-0">
        <NavBar />
      </div>

      <div className="grow">

        <form onSubmit={onSubmit} className="flex justify-between max-w-lg p-5 mx-auto mt-10 bg-black rounded-full">
          <label className="block cursor-pointer">
            <input
              type="file"
              onChange={onFileChange}
              className="block w-full text-sm cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
            />
          </label>
          <button
            type="submit"
            class="hover:bg-violet-400 group gap-3 flex items-center rounded-full bg-violet-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-4"
            >
              <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
            </svg>
            Upload PDF
          </button>
        </form>
        <div className="mx-5 my-10 overflow-y-scroll bg-yellow-300">
             <ul>
          {pdfs.map((pdf) => (
            <li key={pdf._id}>
              <Link to={`/pdf/${pdf._id}`}>{pdf.filename}</Link>
            </li>
          ))}
        </ul>
        </div>
       
      </div>

      <div className="grow-0">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
