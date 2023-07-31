import React, { useState, useEffect } from "react";
import { Button, Card } from 'react-bootstrap'
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import PageAdd from "./PageAdd";

// const URL = import.meta.env.VITE_BASE_URL;

const PageList = ({ URL, comicBookId }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}comicbooks/${comicBookId}/pages/`)
      .then((response) => {
        setPages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoadError("Error fetching pages data:", error);
        setLoading(false);
      });
  }, [URL, comicBookId]);

  ////////////////////////////////////////////////////////////////
  // Add Page
  const handlePageAdded = (newPage) => {
    setPages((prevPages) => [...prevPages, newPage]);
    setShowAddPageModal(false);
  };
  ////////////////////////////////////////////////////////////////
  // Add Page Modal
  const handleAddPageModalOpen = () => {
    setShowAddPageModal(true);
  };

  const handleAddPageModalClose = () => {
    setShowAddPageModal(false);
  };

  ////////////////////////////////////////////////////////////////
  // Delete Page

  const handleDeletePage = async (id) => {
    try {
      const deleteURL = `${URL}comicbooks/${comicBookId}/pages/${id}`;
      console.log("Delete URL:", deleteURL)
      await axios.delete(`${URL}comicbooks/${comicBookId}/pages/${id}`);

      setPages((prevPages) => prevPages.filter((page) => page.id !== id));
    } catch (error) {
      console.error("Error deleting page:", error.response?.data || error);
    }
  };

  ////////////////////////////////////////////////////////////////
  // Delete Confirmation

  const handleDeleteConfirmation = (event, id) => {
    event.preventDefault();
    setPageToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    handleDeletePage(pageToDelete);
    setShowConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setPageToDelete(null);
    setShowConfirmationModal(false);
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
    <div className="page-scroll-container">
      <div className="page-list">
        {pages.map((page) => (
          <Link
            to={`/comicbooks/${comicBookId}/pages/${page.page_number}`}
            key={page.id}
          >
            <Card className="page-card">
              <Card.Img src={page.photo_url} alt="" />
              <h3>{page.page_number}</h3>
              <Card.Text>{page.description}</Card.Text>
              <Button
                onClick={(event) => handleDeleteConfirmation(event, page.id)}
              >
                Delete
              </Button>
            </Card>
          </Link>
        ))}
      </div>

      <Button onClick={handleAddPageModalOpen}>Add Page</Button>
      {showAddPageModal && (
        <PageAdd
          comicBookId={comicBookId}
          onPageAdded={handlePageAdded}
          onClose={handleAddPageModalClose}
        />
      )}
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div
            className="confirmation-modal"
            style={{ backgroundColor: "rgb(90,90,90,.7)" }}
          >
            <p>Are you sure you want to delete this page?</p>
            <Button onClick={handleConfirmDelete}>Yes</Button>
            <Button onClick={handleCancelDelete}>No</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageList;
