import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import AdminEditProduct from "../components/AdminEditProduct";
import AdminProductCard from "../components/AdminProductCard";

const SellerProducts = () => {
  const { sellerId } = useParams(); // Get seller ID from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editProduct, setEditProduct] = useState(null); // Store the product to be edited


    const fetchSellerProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SummaryApi.productsbysellerId.url}/${sellerId}`, {
          method: SummaryApi.productsbysellerId.method,
          credentials: "include",
        });
        const dataResponse = await response.json();
        setProducts(dataResponse?.data || []);
      } catch (error) {
        setError("Error fetching products.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchSellerProducts();
  }, [sellerId]);

  const handleEditProduct = (product) => {
    setEditProduct(product); // Set the product to be edited
  };

  return (
    <div className="p-4 flex flex-col items-center justify-start min-h-screen pt-20">
      <h2 className="font-bold text-lg mb-4">Seller Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && products.length > 0 ? (
        
        <div className='flex items-start flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll-hidden'>
        {
          products.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchSellerProducts}/>
              
            )
          })
        }
      </div>
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        //   {products.map((product) => (
        //     <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        //       <img
        //         src={product.productImage || "/default-image.jpg"} // Use a default image if product has no image
        //         alt={product.productImage ? product.productName : "Default product image"}
        //         className="w-full h-48 object-cover rounded-t-lg"
        //       />
        //       <div className="p-2">
        //         <h3 className="font-semibold text-xl truncate">{product.productName}</h3>
        //         <p className="text-gray-500 text-sm mb-2">{product.description || "No description available"}</p>
        //         <div className="flex justify-between items-center mt-4">
        //           <p className="text-xl text-green-600">${product.price}</p>
        //           <div
        //             className="bg-black text-white px-4 py-2 rounded-lg text-sm  transition-colors duration-200 cursor-pointer"
        //             onClick={() => handleEditProduct(product)} // Pass the clicked product for editing
        //           >
        //             Edit Product
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   ))}
        // </div>
      ) : (
        !loading && <p>No products found for this seller.</p>
      )}

      {/* Display AdminEditProduct if editProduct is set */}
      {editProduct && (
        <AdminEditProduct productData={editProduct} onClose={() => setEditProduct(null)} />
      )}
    </div>
  );
};

export default SellerProducts;
