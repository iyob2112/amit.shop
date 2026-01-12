import React, { useState } from 'react'
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);

    const handleDeleteProduct = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${SummaryApi.deleteuserprodact.url}/${data._id}`, {

              // `${SummaryApi.productsbysellerId.url}/${sellerId}`
                method: SummaryApi.deleteuserprodact.method,
            });

            const result = await response.json();
            if (result.success) {
              toast.success("Product deleted successfully")
                // alert("Product deleted successfully");
                fetchdata(); // refresh the product list
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {displayINRCurrency(data.sellingPrice)}
                    </p>
                    <div className='justify-between flex items-center'>
                        <div
                            className='w-fit p-2 hover:bg-red-600 bg-black rounded-full hover:text-white text-white cursor-pointer'
                            onClick={handleDeleteProduct}
                        >
                            <MdDelete />
                        </div>
                        <div
                            className='w-fit ml-auto p-2 hover:bg-gray-600 bg-black rounded-full hover:text-white text-white cursor-pointer'
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline />
                        </div>
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)}
                    fetchdata={fetchdata}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
