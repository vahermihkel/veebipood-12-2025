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
        
        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </>
  )
}

export default App
