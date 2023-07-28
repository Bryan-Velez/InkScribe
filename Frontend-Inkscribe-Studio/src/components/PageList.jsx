
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PageAdd from "./PageAdd";

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
        setPages(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setError("Error fetching pages data:", error)
        setLoading(false)
      })
      console.log(comicBookId)
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
          <div className="page-card" key={page.id}>
            <Link to={`/edit/${page.id}`}>
              <img src={page.photo_url} alt={page.page_number} />
            </Link>
            <h3>{page.page_number}</h3>
            <p>{page.description}</p>
          </div>
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




// import React from "react";

// const PageList = ({ page }) => {
//   return (
//     <div className="page-card">
//       {/* Display content of the page card here */}
//       <h3>Page {page.page_number}</h3>
//       {/* Add any other content related to the page */}
//     </div>
//   )
// }

// export default PageList;