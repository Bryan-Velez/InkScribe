import React, { useState } from "react";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;

const PageAdd = ({ comicBookId, onPageAdded, onClose }) => {
  const [newPageData, setNewPageData] = useState({
    page_number: "",
    photo_url: "",
    description: "",
    comic_book: comicBookId,
  });
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newPageData.page_number.trim()) {
      setFormError("Page # field is required");
      return;
    }
    const parsedPageNumber = parseInt(newPageData.page_number, 10);
    if (isNaN(parsedPageNumber)) {
      setFormError("Page # must be a valid and unique number");
      return;
    }
    try {
      const response = await axios.post(
        `${URL}comicbooks/${comicBookId}/pages/`,
        newPageData
      );
      onPageAdded(response.data);
      setNewPageData({
        page_number: "",
        photo_url: "",
        description: "",
        comic_book: comicBookId,
      });
      onClose();
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  ////////////////////////////////////////////////////////////////
  // Return

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={handleModalClick}>
        <button type="button" onClick={onClose} style={{ float: "right" }}>
          x
        </button>
        <h2>Add New Page</h2>
        <form onSubmit={handleSubmit}>
          {formError && <div>{formError}</div>}
          <label>
            <p>Page #:</p>
            <input
              type="text"
              value={newPageData.page_number}
              onChange={(e) =>
                setNewPageData({ ...newPageData, page_number: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            <p>Image (URL):</p>
            <input
              type="text"
              value={newPageData.photo_url}
              onChange={(e) =>
                setNewPageData({ ...newPageData, photo_url: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            <p>Description:</p>
            <textarea
              value={newPageData.description}
              onChange={(e) =>
                setNewPageData({ ...newPageData, description: e.target.value })
              }
            />
          </label>
          <br />
          <button type="submit">Create Page</button>
        </form>
      </div>
    </div>
  );
};

export default PageAdd;
