import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Preview from './pages/Preview';
import Cart from './pages/Cart';
import BackdPay from './pages/BackdPay';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/BackdPay" element={<BackdPay />} />
        </Routes>
      </main>
    </>
  );
}
