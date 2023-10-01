import React from 'react'

const Helmet = (props) => {
    document.title= "Shopping -" + props.title
  return (
    <div className='Helmet'>
      {props.children}
    </div>
  )
}

export default Helmet
