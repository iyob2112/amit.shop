import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common";

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loadingSellers, setLoadingSellers] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all sellers and check for products
  const fetchAllSellers = async () => {
    setLoadingSellers(true);
    try {
      const response = await fetch(SummaryApi.allSellers.url, {
        method: SummaryApi.allSellers.method,
        credentials: "include",
      });
      const dataResponse = await response.json();
      const filteredSellers = await Promise.all(
        dataResponse?.data.map(async (seller) => {
          // Fetch products for each seller
          const productResponse = await fetch(
            `${SummaryApi.productsbysellerId.url}/${seller._id}`,
            {
              method: SummaryApi.productsbysellerId.method,
              credentials: "include",
            }
          );
          const productData = await productResponse.json();
          
          // Only include sellers who have products
          if (productData?.data && productData.data.length > 0) {
            return seller;
          }
          return null;
        })
      );

      // Filter out null values (sellers without products)
      setSellers(filteredSellers.filter((seller) => seller !== null));
    } catch (error) {
      setError("Error fetching sellers.");
      console.error("Error fetching sellers:", error);
    } finally {
      setLoadingSellers(false);
    }
  };

  useEffect(() => {
    fetchAllSellers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">All Sellers</h2>

      {/* Display Loading/Error */}
      {loadingSellers && <p>Loading sellers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Seller List */}
      {!loadingSellers && sellers.length > 0 ? (
        <ul className="border p-2 rounded">
          {sellers.map((seller) => (
            <li
              key={seller._id}
              className="py-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/seller-products/${seller._id}`)} // Navigate to seller's product page
            >
              {seller.name || `Seller ID: ${seller._id}`}
            </li>
          ))}
        </ul>
      ) : (
        !loadingSellers && <p>No sellers found with products.</p>
      )}
    </div>
  );
};

export default AllSellers;
