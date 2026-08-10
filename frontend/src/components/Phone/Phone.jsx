import React from 'react'
import "./Phone.css"
import { FaEnvelope } from "react-icons/fa";

const Phone = () => {
  return (
    <div className='phone'>
        <a href="mailto:ikuerowob@gmail.com" target="_blank" rel="noreferrer" aria-label="Email">
            <div className="phone-icon">
                <FaEnvelope />
            </div>
        </a>
    </div>
  )
}

export default Phone