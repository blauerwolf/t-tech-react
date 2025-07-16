import React from 'react'

import { Cart } from './Cart'
import { useAuth } from '../../providers/AuthContext';

export const UserCart = () => {
    const { userName, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Sin autenticar</h1>
            </div>
        )
    }
  return (
    <div className="cart-container mt-5">
        <Cart userName={userName} />
    </div>
  )
}

export default UserCart;
