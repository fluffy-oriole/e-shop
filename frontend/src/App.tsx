import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import HeroPage from "./pages/HeroPage";
import OrderSuccess from "./pages/OrderSucces";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Carts from "./pages/admin/Carts";
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<HeroPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/catalog/:category" element={<Catalog />} />
          <Route path="/cart/order-success" element={<OrderSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/carts" element={<Carts />} />
        </Route>
      </Routes>
  );
}

export default App;