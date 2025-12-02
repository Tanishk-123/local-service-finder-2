import React from "react";

export default function RatingStars({ value=0 }){
  return <div style={{display:"flex",gap:6,alignItems:"center"}}><strong>{value}</strong><span className="muted small">★</span></div>;
}
