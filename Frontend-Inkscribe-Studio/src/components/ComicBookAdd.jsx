import React, { useState } from "react";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;

const ComicBookAdd = ({ onComicBookAdded }) => {
  const [newComicBookData, setNewComicBookData] = useState({
    title: "",
    photo_url: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URL}comicbooks/`, newComicBookData);
      onComicBookAdded(response.data);
      setNewComicBookData({
        title: "",
        photo_url: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating comic book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={newComicBookData.title}
          onChange={(e) => setNewComicBookData({ ...newComicBookData, title: e.target.value })}
        />
      </label>
      <br />
      <label>
        Photo URL:
        <input
          type="text"
          value={newComicBookData.photo_url}
          onChange={(e) => setNewComicBookData({ ...newComicBookData, photo_url: e.target.value })}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={newComicBookData.description}
          onChange={(e) => setNewComicBookData({ ...newComicBookData, description: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Add Comic Book</button>
    </form>
  );
};

export default ComicBookAdd;
