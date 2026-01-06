import React from 'react'
import "./Phone.css"
import { FaPhone } from "react-icons/fa";

const Phone = () => {
  return (
    <div className='phone'>
        <a href="tel:+2348145584399">
            <div className="phone-icon">
                <FaPhone />
            </div>
        </a>
    </div>
  )
}

export default Phone