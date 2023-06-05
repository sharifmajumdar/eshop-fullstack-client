import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import Navbar from './views/Navbar/Navbar'
import ProductsView from './features/Products/ProductsView'
import Footer from './views/Footer/Footer'
import Cart from './features/Cart/Cart'
import Login from './auth/Login/Login'
import Signup from './auth/Signup/Signup'
import PrivateRoutes from './features/PrivateRoutes/PrivateRoutes'
import Checkout from './features/Checkout/Checkout'
import Admin from './features/Admin/Admin'
import History from './features/History/History'
import Deals from './features/Deals/Deals'
import NoMatch from './features/NoMatch'
import Contact from './features/Contact/Contact'
import ForgotPassword from './auth/ForgotPassword/ForgotPassword'

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsView />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/checkout" element={<Checkout />} />
{/*           <Route path="/admin" element={<Admin />} /> */}
          <Route path="/history" element={<History />} />
          <Route path="/deals" element={<Deals />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
