import React from 'react'
import "./HomeCard.css"


const HomeCard = (props) => {
  return (
    <div className='club'>
      <div className="img-div">
        <img className='club-logo' src={props.imgId} alt="" />
        </div>
      <div className="c-name mainFont">
        {props.cName}
      </div>
    </div>
  )
}

export default HomeCard
