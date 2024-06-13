import { Route, Routes } from 'react-router-dom';
import MenuBar from './components/menuBar';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './index.css';
import './flags.css';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Products from './components/products';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';
import UpdateUser from './components/UpdateUser';
import Logout from './components/Logout';
import Sofas from './components/Products/Sofas';
import Tables from './components/Products/Tables';
import Chairs from './components/Products/Chairs';
import Desks from './components/Products/Desks';
import Beds from './components/Products/Beds';
import AdminSofas from './components/AdminProducts/AdminSofas';
import AdminTables from './components/AdminProducts/AdminTables';
import AdminChairs from './components/AdminProducts/AdminChair';
import AdminDesks from './components/AdminProducts/AdminDesk';
import AdminBeds from './components/AdminProducts/AdminBed';
import ManagerUsers from './components/ManagerUsers';
import AddUser from './components/AddUser';



function App() {
  return (
    <div className="App">

      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminProducts" element={<ProductList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct" element={<UpdateProduct />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        <Route path="/deleteProduct" element={<DeleteProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sofas" element={<Sofas />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/desks" element={<Desks />} />
        <Route path="/chairs" element={<Chairs />} />
        <Route path="/adminSofas" element={<AdminSofas />} />
        <Route path="/adminTables" element={<AdminTables />} />
        <Route path="/adminChairs" element={<AdminChairs />} />
        <Route path="/adminDesks" element={<AdminDesks />} />
        <Route path="/adminBeds" element={<AdminBeds />} />
        <Route path="/allusers" element={<ManagerUsers  />} />
        <Route path="/adduser" element={<AddUser/>} />

      </Routes>


    </div>
  );
}

export default App;
