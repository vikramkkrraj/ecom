import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Home } from './pages/home/Home';
import { Order } from './pages/order/Order';
import { Cart } from './pages/cart/Cart';
import { NoPage } from './pages/nopage/NoPage';
import { MyState } from './context/data/MyState';
import { Login } from './pages/registeration/Login';
import { Singup } from './pages/registeration/Singup.';
import { ProductInfo } from './pages/productInfo/ProductInfo';
import { DashBoard } from './pages/admin/dashboard/DashBoard';
import { AddProduct } from './pages/admin/page/AddProduct';
import { UpdateProduct } from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllProducts } from './pages/allproducts/AllProducts';




function App() {
  
  return (
    <>
    <MyState >
      <Router >
        <Routes >
          <Route path='/' element= { <Home />} />
          <Route path='/allproducts' element= {<AllProducts />} />
          <Route path='/order' element= { 
             <ProtectedRoutesForUser>
              <Order />
             </ProtectedRoutesForUser>
            } />
          <Route path='/cart' element = {<Cart/>} />
          <Route path='/dashboard' element = {
            <ProtectedRoutesForAdmin>
              <DashBoard/>
            </ProtectedRoutesForAdmin>
          } />
          <Route path='/*' element={<NoPage/> } />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Singup/>} />
          <Route path='/productinfo/:id' element ={<ProductInfo/>} />
          <Route path='/addproduct' element = {
            <ProtectedRoutesForAdmin>
              <AddProduct/>
            </ProtectedRoutesForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct/>
            </ProtectedRoutesForAdmin>
          } />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
    </>
     
  )
}
export default App;



// user
export const ProtectedRoutesForUser = ({children}) => {
  if(localStorage.getItem('user')){
    return children;
  }else{
    return <Navigate to={'/login'} />
  }
}


// Admin
export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'));
  // console.log(admin.user.email);
  if(admin.user.email ==='vikram@gmail.com'){
    return children
  }else{
    return <Navigate to={'/login'} />
  }
}