import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      <div style={{maxWidth:1100, margin:"0 auto", padding:"18px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", color:"#cbd5e1"}}>
          <div>© {new Date().getFullYear()} LocalFinder</div>
          <div className="small">Built with ❤️ for your college project</div>
        </div>
      </div>
    </footer>
  );
}
