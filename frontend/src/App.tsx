import './App.css'
import {Route, Routes} from "react-router-dom"
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import AddProduct from './pages/admin/AddProduct';
import ManageCategories from './pages/admin/ManageCategories';
import ManageProducts from './pages/admin/ManageProducts';
import SingleProduct from './pages/SingleProduct';
import EditProduct from './pages/admin/EditProduct';
import CheckPayment from './pages/CheckPayment';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import MyOrders from './pages/auth/MyOrders';
import Profile from './pages/auth/Profile';

function App() {

  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/ostukorv" element={ <Cart /> } />

        <Route path="/admin/lisa-toode" element={ <AddProduct/> } />
        <Route path="/admin/halda-kategooriaid" element={ <ManageCategories/> } />
        <Route path="/admin/halda-tooteid" element={ <ManageProducts/> } />
        <Route path="/admin/muuda-toode/:product_id" element={ <EditProduct/> } />

        <Route path="/toode/:product_id" element={ <SingleProduct /> } />
        <Route path="/makse" element={ <CheckPayment /> } />

        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/my-orders" element={ <MyOrders /> } />
        <Route path="/profile" element={ <Profile /> } />
        
        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </>
  )
}

export default App
