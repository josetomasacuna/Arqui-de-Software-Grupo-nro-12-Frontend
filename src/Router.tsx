import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './pages/LandingPage';
import Profile from './pages/Profile';
import Store from './pages/Store';
import Cart from './pages/Cart';

function Router() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <div className="w-[100vw] h-[100vh] bg-blue-200 text-black p-[10vh]">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </BrowserRouter>

        </>
    );
}

export default Router;