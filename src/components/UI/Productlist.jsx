import React, { useEffect, useState } from 'react'
import Productcart from './Productcart'
const Productlist = ({data}) => {
  return (
    <div>
      <Productcart data={data}/>
    </div>
  )
}

export default Productlist
