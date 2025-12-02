import React from "react";
import { useSearchParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import ServiceCard from "../components/ServiceCard";

export default function Services(){
  const { services } = useData();
  const [params] = useSearchParams();
  const q = (params.get("q")||"").toLowerCase();
  const category = params.get("category") || "";

  const filtered = services.filter(s => (s.title + s.category + s.description).toLowerCase().includes(q) && (category? s.category===category : true));

  return (
    <div>
      <h2>Services</h2>
      <div className="grid" style={{marginTop:12}}>
        {filtered.map(s => <ServiceCard s={s} key={s.id} />)}
        {filtered.length===0 && <div className="muted">No services found.</div>}
      </div>
    </div>
  );
}
