import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import Loader from "./components/loader/Loader";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/user/History"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const CreateCate = lazy(() => import("./pages/admin/category/CreateCate"));

const UpdateCate = lazy(() => import("./pages/admin/category/UpdateCate"));
const CreateSub = lazy(() => import("./pages/admin/sub/CreateSub"));
const UpdateSub = lazy(() => import("./pages/admin/sub/UpdateSub"));
const CreateProduct = lazy(() => import("./pages/admin/product/CreateProduct"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const UpdateProduct = lazy(() => import("./pages/admin/product/UpdateProduct"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCoupon")
);
const Payment = lazy(() => import("./pages/Payment"));
const MenuDrawer = lazy(() => import("./components/drawer/MenuDrawer"));
const AdminPassword = lazy(() => import("./pages/admin/AdminPassword"));
const Layout = lazy(() => import("./components/Layout"));

const App = () => {
  const dispatch = useDispatch();

  // check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="flex">
          <Loader />
        </div>
      }
    >
      <SideDrawer />
      <MenuDrawer />
      <ToastContainer theme="colored" />

      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <Route exact path="/product/:slug" component={Product} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/sub/:slug" component={SubHome} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/shop" component={Shop} />

          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/checkout" component={Checkout} />
          <UserRoute exact path="/payment" component={Payment} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/admin/category" component={CreateCate} />
          <AdminRoute
            exact
            path="/admin/category/:slug"
            component={UpdateCate}
          />
          <AdminRoute exact path="/admin/sub" component={CreateSub} />
          <AdminRoute exact path="/admin/sub/:slug" component={UpdateSub} />
          <AdminRoute exact path="/admin/product" component={CreateProduct} />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
          <UserRoute exact path="/admin/password" component={AdminPassword} />
          <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
          <AdminRoute
            exact
            path="/admin/product/:slug"
            component={UpdateProduct}
          />
        </Switch>
      </Layout>
    </Suspense>
  );
};

export default App;
