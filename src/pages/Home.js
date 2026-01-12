import React from 'react'
import CategoryList from '../components/CatagoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'



const Home = () => {
  return (
    <div>

            <BannerProduct/>

            <div className=' w-auto   my-6 mr-0 ml-0 md:mr-10 md:ml-10  sm:pt-0 relative rounded-t-3xl   bg-white '>
            <CategoryList/>
            <div className='p-1  md:pt-6 '>
            <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
                <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
                <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
                <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
                <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
                <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
                <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
                <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
                <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
                <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
                <VerticalCardProduct category={"Sports"} heading={"Sports"}/>
              </div>
           </div>
    </div>
  )
}

export default Home