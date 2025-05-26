import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { getCartByUser, saveCartByUser } from '../../providers/CarritoStorage';
import { Carrito } from './Carrito';

export const CarritoGrid = () => {
  const { userName } = useAuth();
  const [cartItems, setCartItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!userName) {
          setIsLoading(false);
          setCartItems([]);
          return;
        }

        console.log(`Cargando carrito para usuario: ${userName}`);
        const cartData = await getCartByUser(userName);
        console.log('Datos obtenidos de localStorage:', cartData);
        
        setCartItems(Array.isArray(cartData) ? cartData : []);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [userName]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    saveCartByUser(userName, updatedCart);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
  const updatedCart = cartItems.map(item => 
    item.id === itemId 
    ? { 
      ...item, 
      cantidad: Math.max(1, parseInt(newQuantity) || 1) 
    } 
    : item
  );
  setCartItems(updatedCart);
  saveCartByUser(userName, updatedCart);
};

  if (isLoading || cartItems === null) {
    return <p>Cargando carrito...</p>;
  }

  console.log('Renderizando CarritoGrid con:', {
    items: cartItems,
    itemCount: cartItems.length,
    userName: userName
  });

  return (
    <div className="cart-grid">
      <h2>Tu Carrito {userName ? `(${userName})` : ''}</h2>
      <Carrito 
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onQuantityChange={handleQuantityChange}
      />
    </div>
  );
};

export default CarritoGrid;