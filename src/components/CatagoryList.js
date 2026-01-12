import React, { useEffect, useRef, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)
    const scrollElement = useRef(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    const scrollLeft = () => {
        if (scrollElement.current) {
          scrollElement.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
      };
      
      const scrollRight = () => {
        if (scrollElement.current) {
          scrollElement.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
      };

    return ( <div className=' pt-16  md:pt-5 block items-center justify-self-center mx-auto p-0 absolute -top-24 md:-top-28 left-1/2 transform overflow-x-auto -translate-x-1/2 w-[90%] md:w-full max-w-full z-40'>
        {/* Arrow Buttons */}
       <div className=' left-0 top-0 gap-3  hidden md:flex '>
       <button
            className='bg-white shadow-md rounded-full p-1  text-2xl md:block z-20  transform -translate-y-1/2'
            onClick={scrollLeft}
        >
            <FaArrowLeftLong />
        </button>
        <button
            className='bg-white shadow-md rounded-full p-1  text-2xl md:block z-20 top-1/2 transform -translate-y-1/2'
            onClick={scrollRight}
        >
            <FaArrowRightLong />
        </button>
       </div>

        <div ref={scrollElement} className='flex items-center gap-4 px-4 ml-4 xl:justify-center justify-start overflow-x-auto scrollbar-none snap-x snap-mandatory'>
            {loading ? (
                categoryLoading.map((el, index) => (
                    <div key={"categoryLoading" + index} className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse flex-shrink-0'>
                    </div>
                ))
            ) : (
                categoryProduct?.length > 0 ? categoryProduct.map((product) => (
                    <div key={product?.category} className="snap-start">
                    <Link to={`/product-category?category=${product?.category}`} className='cursor-pointer'>
                      <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                        <img src={product?.productImage?.[0] || "/fallback-image.jpg"} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                      </div>
                      <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                    </Link>
                  </div>
                )) : <p className="text-center">No categories available</p>
            )}
        </div>
    </div>
    )
}

export default CategoryList




// import React, { useEffect, useRef, useState } from 'react'
// import SummaryApi from '../common'
// import { Link } from 'react-router-dom'
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"


// const CategoryList = () => {
//     const [categoryProduct,setCategoryProduct] = useState([])
//     const [loading,setLoading] = useState(false)

//     const categoryLoading = new Array(13).fill(null)
//     const scrollElement = useRef()
//     const fetchCategoryProduct = async() =>{
//         setLoading(true)
//         const response = await fetch(SummaryApi.categoryProduct.url)
//         const dataResponse = await response.json()
//         setLoading(false)
//         setCategoryProduct(dataResponse.data)
//     }

//     useEffect(()=>{
//         fetchCategoryProduct()
//     },[])


//     const scrollRight = () =>{
//         scrollElement.current.scrollLeft += 300
//     }
//     const scrollLeft = () =>{
//         scrollElement.current.scrollLeft -= 300
//     }

//   return (
// <div className='mx-auto p-4 absolute -top-16 left-1/2 transform overflow-x-auto -translate-x-1/2 w-[90%] md:w-full max-w-full rounded-b-2xl z-40'>
//     <div className='flex items-center gap-4 justify-center overflow-x-auto scrollbar-none'>
//         {
//             loading ? (
//                 categoryLoading.map((el, index) => {
//                     return (
//                         <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}>
//                         </div>
//                     )
//                 })
//             ) :
//             (
//                 categoryProduct.map((product, index) => {
//                     return (
//                         <div>
//                         <Link to={"/product-category?category=" + product?.category} className='cursor-pointer' key={product?.category}>
//                             <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
//                                 <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
//                             </div>
//                             <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
//                         </Link>
//                                     <button  className='bg-white shadow-md rounded-full p-1 absolute   -left-5 text-2xl hidden md:block' onClick={scrollLeft}><FaArrowLeftLong/></button>
//                                     <button  className='bg-white shadow-md rounded-full p-1 absolute -right-5  text-2xl hidden md:block' onClick={scrollRight}><FaArrowRightLong/></button> 
//                                     </div>
                        
//                     )
//                 })
//             )
//         }
//     </div>
// </div>
//   )
// }

// export default CategoryList