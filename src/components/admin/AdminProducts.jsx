import React from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export const AdminProducts = () => {
  // Datos simulados
  const productos = [
    { id: 1, nombre: 'Producto A', precio: 25.99, stock: 10 },
    { id: 2, nombre: 'Producto B', precio: 15.49, stock: 5 },
    { id: 3, nombre: 'Producto C', precio: 39.99, stock: 20 },
  ];

  const handleAddProduct = () => {
    // Acción para agregar producto (ej: redirigir a formulario)
    console.log('Agregar producto');
  };

  const handleEdit = (id) => {
    console.log('Editar producto', id);
  };

  const handleDelete = (id) => {
    console.log('Eliminar producto', id);
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Button variant="success" onClick={handleAddProduct}>
          Agregar Producto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>${prod.precio.toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>
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
