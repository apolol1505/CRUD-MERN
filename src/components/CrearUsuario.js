import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CrearUsuario = () => {
    const valoresIniciales = {
        nombre: '',
        email: '',
        edad: '0'
    };

    const { id } = useParams();
    const [user, setUser] = useState(valoresIniciales);

    const capturarDatos = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const guardarDatos = async (e) => {
        e.preventDefault();
        const newUser = {
            nombre: user.nombre,
            email: user.email,
            edad: user.edad
        };

        fetch('http://localhost:4000/api/usuarios', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));

        setUser(valoresIniciales);
    };

    const actualizarUsuario = async (e) => {
        e.preventDefault();
        const usuarioActualizado = {
            nombre: user.nombre,
            email: user.email,
            edad: user.edad
        };
        await axios.put('http://localhost:4000/api/usuarios/' + id, usuarioActualizado);
        setUser(valoresIniciales);
    };

    useEffect(() => {
        if (id) {
            fetch('http://localhost:4000/api/usuarios/' + id)
                .then(res => res.json())
                .then(data => {
                    setUser({
                        nombre: data.nombre,
                        email: data.email,
                        edad: data.edad
                    });
                });
        }
    }, [id]);

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <form onSubmit={guardarDatos}>
                    <h4 className='center mb-3'>
                        Crear usuario
                    </h4>
                    <div className='mb-3'>
                        <label>
                            Nombre:
                        </label>
                        <input type="text" className="form-control" placeholder="Ingresar nombre del usuario" name="nombre" required
                            value={user.nombre}
                            onChange={capturarDatos}
                        />
                    </div>
                    <div className='mb-3'>
                        <label>
                            Email:
                        </label>
                        <input type="email" className="form-control" placeholder="Ingresar email del usuario" name="email" required
                            value={user.email}
                            onChange={capturarDatos}
                        />
                    </div>
                    <div className='mb-3'>
                        <label>
                            Edad:
                        </label>
                        <input type="number" className="form-control" placeholder="Ingresar edad del usuario" name="edad" required
                            value={user.edad}
                            onChange={capturarDatos}
                        />
                    </div>
                    <button className="btn btn-primary form-control">
                        Crear usuario
                    </button>
                </form>
                <form onSubmit={actualizarUsuario}>
                    <button className="btn btn-primary form-control mt-2">
                        Actualizar usuario
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CrearUsuario;