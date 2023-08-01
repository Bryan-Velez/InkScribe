import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'
import axios from "axios";
import Loading from "./Loading";
import PageList from "./PageList";

const URL = import.meta.env.VITE_BASE_URL;

const ComicBookEdit = () => {
  const { id } = useParams();
  const [comicBookData, setComicBookData] = useState({
    id: "",
    title: "",
    issue_number: "",
    photo_url: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}comicbooks/${id}/`)
      .then((response) => {
        setComicBookData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoadError("Error fetching comic book data:", error);
        setLoading(false);
      });
    console.log();
  }, [id]);

  ////////////////////////////////////////////////////////////////
  // Update Comic Book Data

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comicBookData.title.trim()) {
      setFormError("Title field is required.");
      return;
    }
    const parsedIssueNumber = parseInt(comicBookData.issue_number, 10);
    if (isNaN(parsedIssueNumber)) {
      setFormError("Issue # must be a valid number");
      return;
    }
    try {
      await axios.put(`${URL}comicbooks/${id}/`, comicBookData);
      // window.location.href = `/comicbooks/${id}`;
    } catch (error) {
      console.error("Error updating comic book:", error);
    }
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
    <div className="comic-edit-page">
      <h1>Edit Comic Book</h1>
      <h3 style={{color: 'white'}}>{comicBookData.title}</h3>
      <Form onSubmit={handleSubmit}>
        {formError && <div>{formError}</div>}
        <Form.Label style={{ marginLeft: "1rem" }}>
          Title:
          <input
            type="text"
            value={comicBookData.title || ""}
            onChange={(e) =>
              setComicBookData({ ...comicBookData, title: e.target.value })
            }
          />
        </Form.Label>
        <Form.Label style={{ marginLeft: "1rem" }}>
          Issue #:
          <input
            type="text"
            value={comicBookData.issue_number || ""}
            onChange={(e) =>
              setComicBookData({
                ...comicBookData,
                issue_number: e.target.value,
              })
            }
          />
        </Form.Label>
        <Form.Label style={{ marginLeft: "1rem" }}>
          Issue Cover (URL):
          <input
            type="text"
            value={comicBookData.photo_url || ""}
            onChange={(e) =>
              setComicBookData({ ...comicBookData, photo_url: e.target.value })
            }
          />
        </Form.Label>
        <Form.Label style={{ marginLeft: "1rem" }}>
          Description:
          <textarea
            style={{ width: "25vw" }}
            value={comicBookData.description || ""}
            onChange={(e) =>
              setComicBookData({
                ...comicBookData,
                description: e.target.value,
              })
            }
          />
        </Form.Label>
        <Button type="submit">Save Changes</Button>
      </Form>

      {comicBookData.id && (
        <>
          <h1>Pages</h1>
          <PageList URL={URL} comicBookId={comicBookData.id} />
        </>
      )}
    </div>
  );
};

export default ComicBookEdit;
