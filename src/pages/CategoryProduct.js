import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")

    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) =>{
      const {name , value, checked} =  e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])


    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])
    
  return (
    <div className='mx-auto p-4 md:p-16 pt-20'>

    {/*** Mobile Version (Filter Dropdown) */}
    <div className='lg:hidden bg-white p-2'>
        <details className="border border-slate-300 p-2 rounded-md">
            <summary className="text-base uppercase font-medium text-slate-500 cursor-pointer">
                Filters & Sorting
            </summary>
            
            <div className='mt-2'>
                {/** Sort By */}
                <div className='mb-4'>
                    <h3 className='text-sm uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                    <form className='text-sm flex flex-col gap-2 py-2'>
                        <div className='flex items-center gap-3'>
                            <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                            <label>Price - Low to High</label>
                        </div>

                        <div className='flex items-center gap-3'>
                            <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                            <label>Price - High to Low</label>
                        </div>
                    </form>
                </div>

                {/** Category Filter */}
                <div className='mb-4'>
                    <h3 className='text-sm uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                    <form className='text-sm flex flex-col gap-2 py-2'>
                        {productCategory.map((categoryName, index) => (
                            <div key={index} className='flex items-center gap-3'>
                                <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </details>
    </div>

    {/*** Desktop Version */}
    <div className='hidden lg:grid grid-cols-[200px,1fr] bg-white'>
        {/** Left Side (Filters) */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {/** Sort By */}
            <div className=''>
                <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                        <label>Price - Low to High</label>
                    </div>

                    <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                        <label>Price - High to Low</label>
                    </div>
                </form>
            </div>

            {/** Category Filter */}
            <div className=''>
                <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                    {productCategory.map((categoryName, index) => (
                        <div key={index} className='flex items-center gap-3'>
                            <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                        </div>
                    ))}
                </form>
            </div>
        </div>

        {/** Right Side (Products) */}
        <div className='px-4'>
            <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>
            <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                {data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading} />
                )}
            </div>
        </div>
    </div>

    {/*** Mobile Product List (Full Width) */}
    <div className="lg:hidden">
        <p className='font-medium text-slate-800 text-lg my-2 text-center'>Search Results: {data.length}</p>
        <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading} />
            )}
        </div>
    </div>
</div>

  )
}

export default CategoryProduct