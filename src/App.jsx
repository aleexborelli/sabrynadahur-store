import { Route, Routes } from "react-router-dom";
import StoreLayout from "./components/layout/StoreLayout";
import AdminGuard from "./components/admin/AdminGuard";
import AdminLayout from "./components/admin/AdminLayout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

export default function App() {
  return <Routes>
    <Route element={<StoreLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Catalog />} />
      <Route path="/produtos/:id" element={<ProductDetail />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/minha-conta" element={<Account />} />
      <Route path="/entrar" element={<Login />} />
    </Route>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route element={<AdminGuard />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="produtos" element={<AdminProducts />} />
        <Route path="produtos/novo" element={<AdminProductForm />} />
        <Route path="produtos/:id" element={<AdminProductForm />} />
        <Route path="configuracoes" element={<AdminSettings />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>;
}
