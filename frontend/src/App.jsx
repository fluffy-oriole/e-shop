import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;