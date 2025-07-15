import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Image} from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { obtenerProductos } from '../../auth/firebase';

import 'bootstrap/dist/css/bootstrap.min.css';


export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loadProductos = async () => {
    
    try {
      setLoading(true);
      const productos = await obtenerProductos();
      console.log(productos)
      setProducts(productos);

    } catch (err) {
      console.error("Error al cargar productos: ", err);
      setError("Parece que no pudimos obtener los productos!");
    } finally {
      setLoading(false);
    }
  };


  const handleAddProduct = () => {
    navigate('/admin/productos/nuevo');
  };

  const handleEdit = (id) => {
    console.log('Editar producto', id);
  };

  const handleDelete = (id) => {
    console.log('Eliminar producto', id);
  };

  useEffect(() => {
      loadProductos();
  }, []);

  return (
    <Container fluid className="mt-5 px-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Button variant="success" onClick={handleAddProduct}>
          Agregar Producto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td className="text-center">
                <Image 
                  src={prod.image}
                  alt={prod.name}
                  width={100}
                  thumbnail 
                />
              </td>
              <td className="align-middle">{prod.name}</td>
              <td className="align-middle">${prod.price.toFixed(2)}</td>
              <td className="align-middle">{prod.rating.count}</td>
              <td className="align-middle">
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(prod.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(prod.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminProducts;
