
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PageAdd from "./PageAdd";
import PageEdit from "./PageEdit";

// const URL = import.meta.env.VITE_BASE_URL;

const PageList = ({ URL, comicBookId }) => {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddPageModal, setShowAddPageModal] = useState(false)


  useEffect(() => {
    axios
      .get(`${URL}comicbooks/${comicBookId}/pages/`)
      .then((response) => {
        const { page_number, photo_url, description } = response.data;

        if (page_number === null || isNaN(parseInt(page_number, 10))) {
            setFormError("Page # must be a valid and unique number");
            setLoading(false);
            return;
          }
        setPages(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setError("Error fetching pages data:", error)
        setLoading(false)
      })
  }, [URL, comicBookId])


  ////////////////////////////////////////////////////////////////
// Loading Animation
  if (loading) {
    return <div>Loading pages...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
////////////////////////////////////////////////////////////////
// Handle Page Add
  const handlePageAdded = (newPage) => {
    setPages((prevPages) => [...prevPages, newPage])
  }

  const handleAddPageModalOpen = () => {
    setShowAddPageModal(true)
  }

  const handleAddPageModalClose = () => {
    setShowAddPageModal(false)
  }

  return (
    <div className="page-scroll-container">
      <div className="page-list">
        {pages.map((page) => (
            <Link to={`/comicbooks/${comicBookId}/pages/${page.page_number}`} key={page.id}>
                <div className="page-card">
              <img src={page.photo_url} alt={page.page_number} />
            <h3>{page.page_number}</h3>
            <p>{page.description}</p>
          </div>
            </Link>
        ))}
      </div>
        {showAddPageModal && (
            <PageAdd
            comicBookId={comicBookId}
            onPageAdded={handlePageAdded}
            onClose={handleAddPageModalClose}
            />
            )}
          <button onClick={handleAddPageModalOpen}>Add Page</button>
    </div>
  )
}

export default PageList;



