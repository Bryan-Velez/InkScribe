import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import PanelList from "./PanelList";
import PanelEdit from "./PanelEdit";

const URL = import.meta.env.VITE_BASE_URL;

const PageEdit = () => {
  const { comicBookId, id } = useParams();
  const [pageData, setPageData] = useState({
    panels: [],
    page_number: "",
    photo_url: "",
    description: "",
    comic_book: comicBookId,
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [formError, setFormError] = useState(null);
  // const [selectedPanel, setSelectedPanel] = useState(null);


  useEffect(() => {
    axios
      .get(`${URL}comicbooks/${parseInt(comicBookId)}/pages/${parseInt(id)}`)
      .then((response) => {
        const { page_number, photo_url, description } = response.data;
        if (page_number === null || isNaN(parseInt(page_number, 10))) {
          setFormError("Page # must be a valid and unique number");
          setLoading(false);
          return;
        }
        setPageData({
          panels: [],
          page_number: page_number,
          photo_url: photo_url || "",
          description: description || "",
          comic_book: comicBookId,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoadError("Error fetching page data:", error);
        setLoading(false);
      });
  }, [comicBookId, id]);

  ////////////////////////////////////////////////////////////////
  // Update Page Data

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pageNumber = String(pageData.page_number).trim();

  if (!pageNumber) {
    setFormError("Page # field is required");
    return;
  }

  const parsedPageNumber = parseInt(pageNumber, 10);
  if (isNaN(parsedPageNumber)) {
    setFormError("Page # must be a valid and unique number");
    return;
  }
    try {
      await axios.put(`${URL}comicbooks/${comicBookId}/pages/${id}`, pageData);
      // Optionally, you can redirect to the page details after editing
      // window.location.href = `/pages/${id}`;
    } catch (error) {
      console.error("Error updating page:", error);
    }
  };


  // const handlePanelSelect = (panelId) => {
  //   // Find the selected panel data from the list of panels
  //   const selectedPanelData = pageData.panels.find((panel) => panel.id === panelId);
  //   setSelectedPanel(selectedPanelData);
  // };

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
    <div className="page-edit">
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        {formError && <div>{formError}</div>}
        <label>
          <p>Page Number:</p>
          <input
            type="text"
            value={pageData.page_number}
            onChange={(e) =>
              setPageData({ ...pageData, page_number: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          <p>Image (URL):</p>
          <input
            type="text"
            value={pageData.photo_url}
            onChange={(e) =>
              setPageData({ ...pageData, photo_url: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          <p>Description:</p>
          <textarea
            value={pageData.description}
            onChange={(e) =>
              setPageData({ ...pageData, description: e.target.value })
            }
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
      <h2>Panel List</h2>
      {/* Render the PanelList component */}
      <PanelList comicBookId={comicBookId} pageId={pageData.page_number} panels={pageData.panels} />
      <h2>Edit Panels</h2>
      {/* Render the PanelEdit component */}
      {/* Pass the comicBookId, id, and panelId to identify the specific panel to edit */}
      {/* pageData.panels && */}

      {/* {selectedPanel && ( */}
        <PanelEdit
          comicBookId={comicBookId}
          pageId={pageData.page_number}
          // panels={pageData.panels}
        />
      {/* )} */}
    </div>
  );
};

export default PageEdit;
