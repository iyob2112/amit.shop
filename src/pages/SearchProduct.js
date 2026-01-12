import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'
import { GrSearch } from 'react-icons/gr'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
   const searchInput = useLocation()
   const URLSearch = new URLSearchParams(searchInput?.search)
   const searchQuery = URLSearch.getAll("q")
   const [search,setSearch] = useState(searchQuery)
 
    console.log("query",query.search)

    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(()=>{
        fetchProduct()
    },[query])

    const handleSearch = (e)=>{
      const { value } = e.target
      setSearch(value)
  
      if(value){
        navigate(`/search?q=${value}`)
      }else{
        navigate("/search")
      }
    }

  return (
    <div className=' mx-auto px-10 pt-16'>
        <div className='flex lg:hidden items-center w-full bg-white mt-4 justify-between border rounded-full focus-within:shadow pl-2'>
            <input 
                type='text' 
                placeholder='Search product here...' 
                className='w-full outline-none px-2 py-2' 
                onChange={handleSearch} 
                value={search}
            />
            <div className='text-lg w-12 h-10 bg-black flex items-center justify-center rounded-r-full text-white'>
                <GrSearch />
            </div>
       </div>


      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct