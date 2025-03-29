import React from 'react'
import '../assets/style.css'

const button = ({type,title,disable,onClick}) => {
  return (
    <>
    <button
    className={`btn ${type}`}
    disabled={disable}
    onClick={onClick}
    >
    {title}
    </button>
    </>
  )
}

export default button