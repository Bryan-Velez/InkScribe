import React, { useState } from "react"
import axios from "axios"

const URL = import.meta.env.VITE_BASE_URL

const ComicBookAdd = ({ onComicBookAdded, onClose }) => {
  const [newComicBookData, setNewComicBookData] = useState({
    id: "",
    title: "",
    issue_number: "",
    photo_url: "",
    description: "",
  })
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!newComicBookData.title.trim()) {
      setFormError("Title field is required");
      return
    }
    const parsedIssueNumber = parseInt(newComicBookData.issue_number, 10);
    if (isNaN(parsedIssueNumber)) {
      setFormError("Issue # must be a valid number");
      return;
    }
    try {
      const response = await axios.post(`${URL}comicbooks/`, newComicBookData)
      onComicBookAdded(response.data)
      setNewComicBookData({
        id: "",
        title: "",
        issue_number: "",
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

////////////////////////////////////////////////////////////////
// Return

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal">
                <button type="button" onClick={onClose} style={{float:'right'}}>
                 x
                </button>
        <h2>Add New Comic Book</h2>
        <form onSubmit={handleSubmit}>
        {formError && <div>{formError}</div>}
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
            <p>Issue #:</p>
            <input
              type="text"
              value={newComicBookData.issue_number}
              onChange={(e) =>
                setNewComicBookData({
                  ...newComicBookData,
                  issue_number: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            <p>Issue Cover (URL):</p>
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
