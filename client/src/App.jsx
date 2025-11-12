// UI Only — Main App component with routing

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateComponent from "./components/PrivateComponent";
import Admin from "./pages/Admin";
import EventDetail from "./pages/EventDetail";
import Events from "./pages/Events";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import MyProfile from "./pages/MyProfile";
import PageNotFound from "./pages/PageNotFound";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="marketplace/:pid" element={<ProductDetail />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:eid" element={<EventDetail />} />
        <Route path="/auth" element={<PrivateComponent />}>
          
          <Route path="admin" element={<Admin />} />
          <Route path="MyProfile" element={<MyProfile />} />
        </Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
}

export default App;
