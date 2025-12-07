import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      <div style={{maxWidth:1100, margin:"0 auto", padding:"18px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", color:"#cbd5e1"}}>
          <div>© {new Date().getFullYear()} Local Service Finder</div>
          <div className="small">All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
