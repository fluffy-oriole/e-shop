import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile.jsx";
import Registration from "./pages/Registration.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Product from "./pages/Product.jsx";
import { Routes, Route, Outlet } from 'react-router-dom';



function App() {
  return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;