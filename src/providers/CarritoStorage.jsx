export const getCartByUser = async (username) => {
  if (!username) {
    console.warn("getCartByUser: No se proporcionó username");
    return [];
  }

  const storageKey = `cart_${username}`;
  
  try {
    const rawData = localStorage.getItem(storageKey);
    if (!rawData) {
      console.log(`No hay carrito guardado para ${username}`);
      return [];
    }

    const parsedData = JSON.parse(rawData);
    
    // Validación y normalización de datos
    if (!Array.isArray(parsedData)) {
      console.warn('Datos de carrito no son un array, reiniciando...');
      return [];
    }

    return parsedData.map(item => ({
      id: item.id,
      title: item.title || 'Producto sin nombre',
      price: Number(item.price) || 0,
      image: item.image || '',
      cantidad: Math.max(1, Number(item.cantidad)) || 1,
      ...item // Mantener otras propiedades
    }));
    
  } catch (error) {
    console.error(`Error al parsear carrito de ${username}:`, error);
    return [];
  }
};


// Función para guardar el carrito de un usuario
export const saveCartByUser = (username, cart) => {
  try {
    if (!username) return;
    localStorage.setItem(`cart_${username}`, JSON.stringify(Array.isArray(cart) ? cart : []));
  } catch (error) {
    console.error("Error al guardar el carrito:", error);
  }
}

// Función para limpiar el carrito
export const clearCartByUser = (username) => {
  try {
    localStorage.removeItem(`cart_${username}`);
  } catch (error) {
    console.error("Error al limpiar el carrito:", error);
  }
}