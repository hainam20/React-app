import React from 'react'
import FeaturedInfo from "../../components/featuredInfo/FeturedInfo"

import "./home.css"
import Chart from '../../components/chart/Chart'

export default function Home() {
  return (
    <div className='home p-3 bg-[rgb(245,246,250)]'>
        <FeaturedInfo/>
        <FeaturedInfo/>
        <FeaturedInfo/>
        {/* <Chart/> */}

    </div>
  )
}
