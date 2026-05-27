import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Preview from './pages/Preview';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BackdPay from './pages/BackdPay';
import Account from './pages/Account';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/BackdPay" element={<BackdPay />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </>
  );
}
