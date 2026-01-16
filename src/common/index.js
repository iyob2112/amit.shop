// const backendDomin = "https://amit-shop-back-end-1.onrender.com";
const backendDomin = "http://localhost:8080";
// const backendDomin = "http://192.168.1.4:8080"

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  forgotPassword: {
    url: `${backendDomin}/api/forgot-password`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomin}/api/reset-password`,
    method: "post",
  },
  // ####################################################################
  allSellers: {
    url: `${backendDomin}/api/sellers`,
    method: "get",
  },
  productsbysellerId: {
    url: `${backendDomin}/api/productsbyseller`,
    method: "get",
  },
  allOrders: {
    url: `${backendDomin}/api/all-orders`,
    method: "get",
  },
  createOrder: {
    url: `${backendDomin}/api/orders`,
    method: "post",
  },
  getOrderById: {
    url: `${backendDomin}/api/orders`,
    method: "get",
  },
  cancelOrder: {
    url: `${backendDomin}/api/cancel`,
    method: "post",
  },
  getuserprodact: {
    url: `${backendDomin}/api/user`,
    method: "get",
  },
  deleteuserprodact: {
    url: `${backendDomin}/api/product`,
    method: "DELETE",
  },
  deleteUser: {
    url: `${backendDomin}/api/delete-user/:id`,
    method: "DELETE",
  },

  // ####################################################################
};

export default SummaryApi;
