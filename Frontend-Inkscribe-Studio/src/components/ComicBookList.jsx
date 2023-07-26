import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import ComicBookAdd from "./ComicBookAdd";

const URL = import.meta.env.VITE_BASE_URL;
console.log(`${URL}comicbooks/`)

const ComicBookList = () => {
  const [comicBooks, setComicBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

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
  };
  
  
  ////////////////////////////////////////////////////////////////
  // Delete Comic Book
  
  const handleDeleteComicBook = async (id) => {
    try {
      // Make a DELETE request to delete the comic book
      await axios.delete(`${URL}comicbooks/${id}/`);
      // Remove the deleted comic book from the state
      setComicBooks((prevComicBooks) => prevComicBooks.filter((comicBook) => comicBook.id !== id));
    } catch (error) {
      console.error("Error deleting comic book:", error);
    }
  };


  return (
    <div>
      <h1>Comic Books</h1>
      <ul>
        {comicBooks.map((comicBook) => (
          <li key={comicBook.id}>
            {comicBook.title}
            <button onClick={() => handleDeleteComicBook(comicBook.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ComicBookAdd onComicBookAdded={handleComicBookAdded} />
    </div>
  );
};


export default ComicBookList;







// import React from 'react';

// const ComicBook = () => {
//   // Comic book management logic here
//   // ...

//   const [comicBook, setComicBook] = useState([]);

//   // Function to create a new comic book
//   const createComicBook = () => {
//     // Logic to create a new comic book
//     // You may want to set an initial cover page, title, or other metadata
//     // For simplicity, we'll create an empty comic book with a single page
//     const newComicBook = [{ id: 1, panels: [] }];
//     setComicBook(newComicBook);
//   };

//   // Function to add a new page to the comic book
//   const addPage = () => {
//     // Logic to add a new page to the comic book
//     const newPage = { id: comicBook.length + 1, panels: [] };
//     setComicBook(prevComicBook => [...prevComicBook, newPage]);
//   };

//   // Function to delete a page from the comic book
//   const deletePage = (pageId) => {
//     // Logic to delete the specified page from the comic book
//     setComicBook(prevComicBook => prevComicBook.filter(page => page.id !== pageId));
//   };

//   return (
//     <div>
//       {/* Render comic book-related content here */}
//     </div>
//   );
// };

// export default ComicBook;
