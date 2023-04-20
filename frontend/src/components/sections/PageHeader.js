import React from 'react'
import "./PageHeader.css"
import { MdArrowBack } from "react-icons/md";

export default function PageHeader({pageName}) {
  return (
      <header>
          {/* <div
              style={{ fontWeight: "1.5rem",  }}
          >
              <MdArrowBack />
          </div> */}
          <div
              style={{fontSize: "1.5rem", fontWeight: 500 }}
          >
              {pageName || "Default Page Name"}
          </div>
      </header>
  );
}
