import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import HeroPage from "./pages/HeroPage";
import HomeFilteredByCategory from "./pages/HomeFilteredByCategory";
import OrderSuccess from "./pages/OrderSucces";
import { Routes, Route, Outlet } from 'react-router-dom';



function App() {
  return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<HeroPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/products/category/:category" element={<HomeFilteredByCategory />} />
          <Route path="/cart/order-success" element={<OrderSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;