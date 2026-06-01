import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import GetInTouch from "./sections/GetInTouch";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Admin from "./pages/Admin";

function Layout() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <ScrollManager />
      <Navbar />
      <Outlet />
      <GetInTouch />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
