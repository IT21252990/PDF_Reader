import React, { useState, useEffect, useContext } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Home() {

  const { user } = useAuthContext();
    const [pdfs, setPDFs] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
      if (user) {
          fetch('/api/pdf', {
              headers: { Authorization: `Bearer ${user.token}` }
          })
              .then(res => res.json())
              .then(data => setPDFs(data));
      }
  }, [user]);

  const onFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('pdf', file);

      await fetch('/api/pdf/upload', {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${user.token}`
          },
          body: formData
      });

      if (user) {
          fetch('/api/pdf', {
              headers: { Authorization: `Bearer ${user.token}` }
          })
              .then(res => res.json())
              .then(data => setPDFs(data));
      }
  };


  return (
    <div>
       <NavBar />
       <div>
            <h1>Home</h1>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} />
                <button type="submit">Upload PDF</button>
            </form>
            <ul>
                {pdfs.map(pdf => (
                    <li key={pdf._id}>
                        <Link to={`/pdf/${pdf._id}`}>{pdf.filename}</Link>
                    </li>
                ))}
            </ul>
        </div>
        <Footer/>
    </div>
   
  )
}

export default Home