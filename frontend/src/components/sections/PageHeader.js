import React from 'react'
import "./PageHeader.css"

export default function PageHeader({pageName}) {
  return (
      <header>
          <div
              style={{ fontSize: "1.5rem", fontWeight: 500 }}
          >
              {"<-"}
          </div>
          <div
              style={{ margin: "0 20px", fontSize: "1.5rem", fontWeight: 500 }}
          >
              {pageName || "Default Page Name"}
          </div>
      </header>
  );
}
