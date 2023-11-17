import { useState } from 'react';
import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from '../src/components/Cart/Cart';
function App() {
  const [cartIsShown,setCartIsShown] = useState(false);
  const handleshowCart = () =>{
    setCartIsShown(true);
  }
  const handlehideCart = () =>{
    setCartIsShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={handlehideCart}/>}
      <Header onShowCart={handleshowCart}/>
      <main><Meals/></main>
      
    </CartProvider>
  );
}

export default App;
