import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Loading from "./Loading"
import ComicBookAdd from "./ComicBookAdd"


const URL = import.meta.env.VITE_BASE_URL;

console.log(`${URL}comicbooks/`)

const ComicBookList = () => {
  const [comicBooks, setComicBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [showAddComicModal, setShowAddComicModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [comicToDelete, setComicToDelete] = useState(null)

  useEffect(() => {
    axios
      .get(`${URL}comicbooks/`)
      .then((response) => {
        setComicBooks(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setLoadError("Error fetching comic books:", error)
        setLoading(false)
      })
  }, [])

  ////////////////////////////////////////////////////////////////
  // Add Comic Book
  const handleComicBookAdded = (newComicBook) => {
    setComicBooks((prevComicBooks) => [...prevComicBooks, newComicBook])
    setShowAddComicModal(false)
  };
  ////////////////////////////////////////////////////////////////
  // Add Comic Book Modal
  
  const handleAddComicModalOpen = () => {
    setShowAddComicModal(true)
  };
  const handleCloseModal = () => {
    setShowAddComicModal(false)
  };
  
  ////////////////////////////////////////////////////////////////
  // Delete Comic Book
  
  const handleDeleteComicBook = async (id) => {
    try {
      await axios.delete(`${URL}comicbooks/${id}/`)
      setComicBooks((prevComicBooks) =>
      prevComicBooks.filter((comicBook) => comicBook.id !== id)
      )
    } catch (error) {
      console.error("Error deleting comic book:", error)
    }
  };
  
  ////////////////////////////////////////////////////////////////
  // Delete Confirmation
  const handleDeleteConfirmation = (id) => {
    setComicToDelete(id)
    setShowConfirmationModal(true)
  };
  
  const handleConfirmDelete = () => {
    handleDeleteComicBook(comicToDelete)
    setShowConfirmationModal(false)
  };
  
  const handleCancelDelete = () => {
    setComicToDelete(null)
    setShowConfirmationModal(false)
  };

  ////////////////////////////////////////////////////////////////
  // Loading Animation
  
    if (loading) {
      return <Loading />;
    }
  
    if (loadError) {
      return <div>Error: {loadError}</div>;
    }
  
  ////////////////////////////////////////////////////////////////
  // Return
  
  return (
    <div className="comic-book-list">
      <h1>Comic Books</h1>
      <ul>
        {comicBooks.map((comicBook) => (
          <li key={comicBook.id}>
            <Link to={`/comicbooks/${comicBook.id}`}>{comicBook.title}</Link>
            <button onClick={() => handleDeleteConfirmation(comicBook.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddComicModalOpen}>Add New Comic Book</button>
      {showAddComicModal && (
        <ComicBookAdd
          onComicBookAdded={handleComicBookAdded}
          onClose={handleCloseModal}
        />
      )}
       {showConfirmationModal && (
        <div className="modal-overlay">
        <div className="confirmation-modal" style={{backgroundColor: 'rgb(90,90,90,.7)'}}>
          <p>Are you sure you want to delete this Comic Book?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
        </div>
      )}

    </div>
  )
};

export default ComicBookList












