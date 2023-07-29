import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading"; 


const URL = import.meta.env.VITE_BASE_URL;

const PanelList = ({ comicBookId, pageId }) => {
    // const { comicBookId, pageId } = useParams();
    const[panels, setPanels] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        axios
          .get(`${URL}comicbooks/${comicBookId}/pages/${pageId}/panels/`)
          .then((response) => {
            setPanels(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoadError("Error fetching panels data:", error);
            setLoading(false);
          });
      }, [comicBookId, pageId]);
     
    if (loading) {
        return <Loading />;
      }
    
      if (loadError) {
        return <div>Error: {loadError}</div>;
      }
    

////////////////////////////////////////////////////////////////
// Return
  return (
    <div className="panel-list">
      {panels.map((panel) => (
        <Link key={panel.id} to={`/panels/${panel.id}`}>
        <div key={panel.id} className="panel-card" style={{backgroundColor:'grey'}}>
          <img src={panel.photo_url} alt='' />
          <h3>{`Panel ${panel.panel_number}`}</h3>
          <p>{panel.page}</p>
        </div></Link>
      ))}
    </div>
  );
};

export default PanelList;