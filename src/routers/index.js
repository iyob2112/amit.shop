import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import ResetPassword from '../pages/ResetPassword'
import SellerProducts from '../pages/SellerProducts'
// ADMIN PAGES
import AdminPanel from '../pages/Admin/AdminPanel'
import AllUsers from '../pages/Admin/AllUsers'
import AdminProfilePage from '../pages/Admin/AdminProfilePage'
import AllSellers from '../pages/Admin/AllSellers'
import AllOrders from '../pages/Admin/AllOrders'
import AdminEditProfile from '../pages/Admin/AdminEditPtofile'
import AdminPtoductsPage from '../pages/Admin/AdminUserProducts'
import AdminAllProducts from '../pages/Admin/AdminProductsPageAll'
// SELLER PAGES
import SellerProfilePage from '../pages/sellers/SellerProfilePage'
import SellerEditProfile from '../pages/sellers/SellerEditPtofile'
import SellerPtoductsPage from '../pages/sellers/SellerUserProducts'
// USER PAGES
import UserProfilePage from '../pages/users/UserProfilePage'
import UserEditProfile from '../pages/users/UserEditPtofile'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            // #############################################################################

            {
                path:"ResetPassword",
                element:<ResetPassword/>
            },
            { path:"/seller-products/:sellerId" ,
                element:<SellerProducts/> 
            },
            // ADMIN PAGES
            {
                path : "AdminProfilePage",
                element : <AdminProfilePage/>,
                children : [
                    { path:"AdminEditProfile" ,
                        element:<AdminEditProfile/> 
                    },
                    { path:"AdminProductsPage" ,
                        element:<AdminPtoductsPage/> 
                    },
                    
                ]},
                {
                    path : "admin-panel",
                    element : <AdminPanel/>,
                    children : [
                        {
                            path : "all-users",
                            element : <AllUsers/>
                        },
                        {
                            path : "all-sellers",
                            element : <AllSellers/>
                        },
                        { 
                            path:"order-list",
                            element:<AllOrders/> 
                        },
                        { 
                            path:"AllProducts",
                            element:<AdminAllProducts/> 
                        },
                    ]
                },
                // ADMIN PAGES
                // SELLER PAGES
                {
                    path : "SellerProfilePage",
                    element : <SellerProfilePage/>,
                    children : [
                        { path:"SellerEditProfile" ,
                            element:<SellerEditProfile/> 
                        },
                        { path:"SellerPtoductsPage" ,
                            element:<SellerPtoductsPage/> 
                        },
                        
                    ]},
                // SELLER PAGES
                // USER PAGES
                {
                    path : "UserProfilePage",
                    element : <UserProfilePage/>,
                    children : [
                        { path:"UserEditProfile" ,
                            element:<UserEditProfile/> 
                        },                        
                    ]},
                // USER PAGES
            // #############################################################################
          
        ]
    }
])


export default router