import React from 'react'
import FeaturedInfo from "../../components/featuredInfo/FeturedInfo"

import "./home.css"
import Chart from '../../components/chart/Chart'

export default function Home() {
  return (
    <div className='home'>
        <FeaturedInfo/>
        <FeaturedInfo/>
        <FeaturedInfo/>
        {/* <Chart/> */}

    </div>
  )
}
