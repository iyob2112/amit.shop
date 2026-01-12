import React, { useEffect, useState } from 'react'
import UploadProduct from '../../components/UploadProduct'
import SummaryApi from '../../common'
import AdminProductCard from '../../components/AdminProductCard'

const AdminAllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch all products from the API
  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()
      console.log("API response data:", dataResponse)

      // Ensure the data is in the expected format
      setAllProduct(dataResponse?.data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  // Filter products based on the search query
  const filteredProducts = allProduct.filter((product) => {
    if (product?.productName) {
      return product?.productName.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return false
  })

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>

        {/* Search input */}
        <input
          type="text"
          className="border-2 p-2 rounded"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* All product list */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
            )
          })
        ) : (
          <p className="text-center w-full">No products found</p>
        )}
      </div>

      {/* Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  )
}

export default AdminAllProducts
