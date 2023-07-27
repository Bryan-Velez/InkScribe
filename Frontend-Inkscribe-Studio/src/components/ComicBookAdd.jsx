import React, { useState } from "react"
import axios from "axios"

const URL = import.meta.env.VITE_BASE_URL

const ComicBookAdd = ({ onComicBookAdded, onClose }) => {
  const [newComicBookData, setNewComicBookData] = useState({
    title: "",
    photo_url: "",
    description: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${URL}comicbooks/`, newComicBookData)
      onComicBookAdded(response.data)
      setNewComicBookData({
        title: "",
        photo_url: "",
        description: "",
      })
      onClose()
    } catch (error) {
      console.error("Error creating comic book:", error)
    }
  }

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      onClose() 
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal">
                <button type="button" onClick={onClose} style={{float:'right'}}>
                 x
                </button>
        <h2>Add New Comic Book</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Title:</p>
            <input
              type="text"
              value={newComicBookData.title}
              onChange={(e) =>
                setNewComicBookData({
                  ...newComicBookData,
                  title: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            <p>Comic Book Cover (URL):</p>
            <input
              type="text"
              value={newComicBookData.photo_url}
              onChange={(e) =>
                setNewComicBookData({
                  ...newComicBookData,
                  photo_url: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            <p>Description:</p>
            <textarea
              value={newComicBookData.description}
              onChange={(e) =>
                setNewComicBookData({
                  ...newComicBookData,
                  description: e.target.value,
                })
              }
            />
          </label>
          <br />
          <button type="submit">Create Comic Book</button>
        </form>
      </div>
    </div>
  )
}

export default ComicBookAdd
