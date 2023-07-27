// PageList.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

// const URL = import.meta.env.VITE_BASE_URL;

const PageList = ({URL, comicBookId }) => {
//   const { id } = useParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}comicbooks/${comicBookId}/pages/`)
      .then((response) => {
        setPages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching pages data:", error);
        setLoading(false);
      });
  }, [URL, comicBookId]);

  if (loading) {
    return <div>Loading pages...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-list-container">
      <div className="page-list">
        {pages.map((page) => (
          <div className="page-card" key={page.id}>
            <Link to={`/edit/${page.id}`}>
              <img src={page.imageUrl} alt={page.title} />
            </Link>
            <h3>{page.page_number}</h3>
            {/* <p>{page.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageList;




// import React from "react";

// const PageList = ({ page }) => {
//   return (
//     <div className="page-card">
//       {/* Display content of the page card here */}
//       <h3>Page {page.page_number}</h3>
//       {/* Add any other content related to the page */}
//     </div>
//   );
// };

// export default PageList;