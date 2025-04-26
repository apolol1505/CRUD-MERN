import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListarUsuario = () => {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const respuesta = await axios.get('http://localhost:4000/api/usuarios');
                setLista(respuesta.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        obtenerUsuarios();
    }, [lista]); // Fixed dependency array to avoid infinite loop

    const eliminarUsuario = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:4000/api/usuarios/` + id);
                setLista(lista.filter((list) => list._id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };


    return (
        <div className='row'>
            {lista.map((list) => ( // Added curly braces to properly evaluate the map function
                <div className='col-md-4 p-2' key={list._id}>
                    <div className='card'>
                        <div className='card-header'>
                            <h5>Nombre: {list.nombre}</h5>
                        </div>
                        <div className='card-body'>
                            <p>{list.email}</p>
                            <p>{list.edad}</p>
                        </div>
                        <div className='card-footer'>
                            <button className='btn btn-danger' onClick={() => eliminarUsuario(list._id)}>
                                Eliminar</button>
                            <Link to={'/edit/' + list._id} className='btn btn-primary m-1'>
                                Editar</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListarUsuario;