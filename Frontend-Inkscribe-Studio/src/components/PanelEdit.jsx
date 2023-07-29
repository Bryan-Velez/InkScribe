import React from "react";
import { useParams } from "react-router-dom";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import Loading from "./Loading";

const URL = import.meta.env.VITE_BASE_URL;

const PanelEdit = () => {
  const { comicBookId, pageId, panelId } = useParams();
  const [panelData, setPanelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);


  useEffect(() => {
    axios
      .get(`${URL}comicbooks/${comicBookId}/pages/${pageId}/panels/${panelId}`)
      .then((response) => {
        setPanelData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoadError("Error fetching panel data:", error);
        setLoading(false);
      });
  }, [comicBookId, pageId, panelId]);
  



  ////////////////////////////////////////////////////////////////
  // Handle Panel Resize

  const handleResize = (event, { size }) => {
    // Update the panel size in the state
    setPanelData((prevPanelData) => ({
      ...prevPanelData,
      width: size.width,
      height: size.height,
    }));
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
    <div className="panel-edit" style={{backgroundColor: 'white'}}>
      {/* Render detailed view and editing controls for the panel here */}
      <h2>Edit Panel</h2>
      <div className="panel-details">
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
