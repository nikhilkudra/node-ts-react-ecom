import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

import { CartProvider } from './components/CartContext';
import Checkout from './components/Checkout';
function App() {
  return (
     <CartProvider>
    <div className="App">
      <BrowserRouter >
      <Nav />
     <Routes>
       <Route element={<PrivateComponent />}>
       <Route path="/" element={<ProductList />} />
       <Route path="/add" element={<AddProduct />} />
       <Route path="/checkout" element={<Checkout/>} />
       <Route path="/logout" element={<h1> Logout Component</h1>} />
       <Route path="/profile" element={<h1>Profile Component</h1>} />
       </Route>

       <Route path="/signup" element={<SignUp />} />
       <Route path="/login" element={<Login />} />

     </Routes>
     </BrowserRouter>
     <Footer />
    </div>
     </CartProvider >
  );
}

export default App;
