import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import ComicBookAdd from "./ComicBookAdd";


const URL = import.meta.env.VITE_BASE_URL;

console.log(`${URL}comicbooks/`);

const ComicBookList = () => {
  const [comicBooks, setComicBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${URL}comicbooks/`)
      .then((response) => {
        setComicBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoadError("Error fetching comic books:", error);
        setLoading(false);
      });
  }, []);

  ////////////////////////////////////////////////////////////////
  // Loading screen
  if (loading) {
    return <Loading />;
  }

  if (loadError) {
    return <div>Error: {loadError}</div>;
  }
  ////////////////////////////////////////////////////////////////
  // Add Comic Book
  const handleComicBookAdded = (newComicBook) => {
    setComicBooks((prevComicBooks) => [...prevComicBooks, newComicBook]);
    setShowModal(false);
  };

  ////////////////////////////////////////////////////////////////
  // Delete Comic Book

  const handleDeleteComicBook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comic book?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`${URL}comicbooks/${id}/`);
        setComicBooks((prevComicBooks) =>
          prevComicBooks.filter((comicBook) => comicBook.id !== id)
        );
      } catch (error) {
        console.error("Error deleting comic book:", error);
      }
    }
  };
  ////////////////////////////////////////////////////////////////
  // Add Comic Book Modal

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const toggleModal = () => {
  //   setShowModal((prevShowModal) => !prevShowModal)
  // }

  return (
    <div>
      <h1>Comic Books</h1>
      <ul>
        {comicBooks.map((comicBook) => (
          <li key={comicBook.id}>
            <Link to={`/comicbooks/${comicBook.id}`}>{comicBook.title}</Link>
            <button onClick={() => handleDeleteComicBook(comicBook.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleOpenModal}>Add New Comic Book</button>
      {showModal && (
        <ComicBookAdd
          onComicBookAdded={handleComicBookAdded}
          onClose={handleCloseModal}
        />
      )}

    </div>
  );
};

export default ComicBookList












// import React from 'react';

// const ComicBook = () => {
//   // Comic book management logic here
//   // ...

//   const [comicBook, setComicBook] = useState([])

//   // Function to create a new comic book
//   const createComicBook = () => {
//     // Logic to create a new comic book
//     // You may want to set an initial cover page, title, or other metadata
//     // For simplicity, we'll create an empty comic book with a single page
//     const newComicBook = [{ id: 1, panels: [] }];
//     setComicBook(newComicBook)
//   }

//   // Function to add a new page to the comic book
//   const addPage = () => {
//     // Logic to add a new page to the comic book
//     const newPage = { id: comicBook.length + 1, panels: [] }
//     setComicBook(prevComicBook => [...prevComicBook, newPage])
//   }

//   // Function to delete a page from the comic book
//   const deletePage = (pageId) => {
//     // Logic to delete the specified page from the comic book
//     setComicBook(prevComicBook => prevComicBook.filter(page => page.id !== pageId))
//   }

//   return (
//     <div>
//       {/* Render comic book-related content here */}
//     </div>
//   )
// }

// export default ComicBook;
