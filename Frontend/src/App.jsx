import  Login  from "./pages/Login";
import  Signup  from "./pages/Signup";
import  AdminApproval  from "./pages/AdminApproval";
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import CategoryFilter from "./pages/CategoryFilter";
import Product from "./pages/ProductPage"
import Cart from './pages/Cart'
import QuotationRequests from './pages/QuotationRequests'
import OrderAdmin from "./pages/OrderAdmin";
import Home from "./pages/Home";
// import Experiment from "./pages/Experminent";

const App=()=>{
  const user=false;
  return (
    <Router>
      <Routes>
        <Route path="/" element={user?<Navigate to="/"/>:<Home/>}/>
        <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
        <Route path="/signup" element={user?<Navigate to="/"/>:<Signup/>}/>
        <Route path="/admin" element={user?<Navigate to="/"/>:<AdminApproval/>}/>
        <Route path="/product" element={user?<Navigate to="/"/>:<Products/>}/>
        <Route path="/brand" element={user?<Navigate to="/"/>:<Brands/>}/>
        <Route path="/categories" element={user?<Navigate to="/"/>:<Categories/>}/>
        <Route path="/user/category" element={user?<Navigate to="/"/>:<CategoryFilter/>}/>
        <Route path="/quotation" element={user?<Navigate to="/"/>:<QuotationRequests/>}/>
        <Route path="/orders" element={user?<Navigate to="/"/>:<OrderAdmin/>}/>
        <Route path="/cart" element={user?<Navigate to="/"/>:<Cart/>}/>
        <Route path="/product/:id" element={<Product/>}/>    
      </Routes>
    </Router>
  );
}
export default App;
