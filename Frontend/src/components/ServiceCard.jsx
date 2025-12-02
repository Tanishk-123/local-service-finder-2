import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function ServiceCard({ s }){
  return (
    <div className="card">
      <div className="flex" style={{justifyContent:"space-between"}}>
        <div className="icon">{s.image}</div>
        <div style={{textAlign:"right"}}>
          <div className="small muted">{s.location}</div>
          <div style={{fontWeight:700}}>₹{s.price}</div>
        </div>
      </div>

      <h3>{s.title}</h3>
      <div className="muted small">{s.category} • {s.description}</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
        <RatingStars value={s.rating} />
        <Link to={`/services/${s.id}`} className="btn">View</Link>
      </div>
    </div>
  );
}
