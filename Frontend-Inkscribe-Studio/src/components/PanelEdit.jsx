import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'
import axios from "axios";
import { useParams } from "react-router-dom";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import Loading from "./Loading";

const URL = import.meta.env.VITE_BASE_URL;

const PanelEdit = ({ pageId, panels }) => {
  const { comicBookId, id } = useParams();
  const [panelData, setPanelData] = useState({
    speech_bubbles: [],
    page: pageId,
    panel_number: '',
    height: '',
    width: '',
    x: '',
    y: '',
    photo_url: '',
    description: '',
    comic_book: comicBookId,
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}comicbooks/${parseInt(comicBookId)}/pages/${parseInt(pageId)}/panels/${parseInt(id)}`)
      .then((response) => {
        console.log('api response:',response.data);
        console.log('this:',response.data, pageId);
        const { speech_bubbles, panel_number, height, width, x, y, photo_url, description } = response.data;
        if (panel_number === null || isNaN(parseInt(panel_number, 10))) {
          setLoadError('Panel # must be a valid and unique number')
          setLoading(false)
        }
        console.log(pageId)
        setPanelData({
          speech_bubbles: speech_bubbles || "",
          page: pageId,
          panel_number: panel_number,
          height: height || "",
          width: width || "",
          x: x || "",
          y: y || "",
          photo_url: photo_url || "",
          description: description || "",
          comic_book: comicBookId,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoadError("Error fetching panel data:", error);
        setLoading(false);
      });
  }, [comicBookId, pageId, id]);
  



  ////////////////////////////////////////////////////////////////
  // Handle Panel Resize

  const handleResize = (event, { size }) => {
    // Update the panel size in the state
    setPanelData((prevPanelData) => ({
      ...prevPanelData,
      width: size.width,
      height: size.height,
    }));
    savePanelChanges();
  };

  ////////////////////////////////////////////////////////////////
  // Handle Panel Drag

  const handleDrag = (event, { deltaX, deltaY }) => {
    // Update the panel position in the state
    setPanelData((prevPanelData) => ({
      ...prevPanelData,
      x: prevPanelData.x + deltaX,
      y: prevPanelData.y + deltaY,
    }));
    savePanelChanges();
  };


////////////////////////////////////////////////////////////////
  // Save Panel Changes 

  const savePanelChanges = async () => {
    try {
      await axios.put(`${URL}comicbooks/${parseInt(comicBookId)}/pages/${parseInt(pageId)}/panels/${parseInt(id)}`, panelData);
    } catch (error) {
      console.error("Error updating panel:", error);
    }
  };

  useEffect(() => {
    // Save panel changes when panelData changes
    if (Object.keys(panelData).length !== 0) {
      savePanelChanges();
    }
  }, [panelData, comicBookId, pageId, id]);

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
    <div className="panel-edit" style={{backgroundColor: 'white'}}>
      {/* Render detailed view and editing controls for the panel here */}
      <h2>Edit Panel</h2>
      <div className="panel-details" style={{backgroundColor: 'grey'}}>
        <img
          src={panelData.photo_url}
          alt={`Panel ${panelData.panel_number}`}
        />
        {/* Display other panel details here */}
      </div>
      {/* Implement resizable and draggable functionality */}
      <Draggable
        defaultPosition={{ x: panelData.x, y: panelData.y }}
        onDrag={handleDrag}
        bounds="parent" // Restrict dragging within the parent container
      >
        <Resizable
          width={panelData.width}
          height={panelData.height}
          onResize={handleResize}
          bounds="parent" // Restrict resizing within the parent container
        >
          <div className="resizable-panel">
          Drag and Resize Me
            {/* Display panel content here (e.g., text, images, etc.) */}
          </div>
        </Resizable>
      </Draggable>
    </div>
  );
};

export default PanelEdit;
