import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndCondition from "./pages/TermsAndCondition";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Layout}>
          <Route index Component={Home} />
          <Route path="about" Component={About} />
          <Route path="blogs" Component={Blog} />
          <Route path="blog/:id" Component={SingleBlog} />
          <Route path="contact" Component={Contact} />
          <Route path="store" Component={OurStore} />
          <Route path="cart" Component={Cart} />
          <Route path="checkout" Component={Checkout} />
          <Route path="product/:id" Component={SingleProduct} />
          <Route path="compare" Component={CompareProduct} />
          <Route path="wishlist" Component={WishList} />
          <Route path="login" Component={Login} />
          <Route path="signup" Component={Signup} />
          <Route path="privacy-policy" Component={PrivacyPolicy} />
          <Route path="refund-policy" Component={RefundPolicy} />
          <Route path="shipping-policy" Component={ShippingPolicy} />
          <Route path="terms-and-conditions" Component={TermsAndCondition} />
          <Route path="reset-password" Component={ResetPassword} />
          <Route path="forget-password" Component={ForgetPassword} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
