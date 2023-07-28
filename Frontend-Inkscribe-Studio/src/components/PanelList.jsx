import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading"; 


const URL = import.meta.env.VITE_BASE_URL;

const PanelList = () => {
    const[panels, setPanels] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

  return (
    <div className="panel-list">
      {panels.map((panel) => (
        <div key={panel.id} className="panel-card">
          <img src={panel.photo_url} alt={`Panel ${panel.panelNumber}`} />
          <h3>{`Panel ${panel.panelNumber}`}</h3>
          <p>{panel.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PanelList;
