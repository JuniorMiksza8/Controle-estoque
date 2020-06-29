import React, { useState } from 'react';
import api from '../../api';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCamera } from 'react-icons/fi';
import Dropzone from 'react-dropzone';

import './styles.css';

export default function NovoUsuario() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [imagem, setImagem] = useState();

    async function create(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('email', email);
        data.append('senha', senha);
        data.append('file', imagem);

        await api.post('usuario', data).then((res) => {
            console.log(res);
            alert(`Usuario criado com sucesso, ID : ${res.data.id}`);
            history.push('/produtos');
        }).catch(err => {
            alert('Erro ao criar usuario');
            console.log(err);
        });


    }

    function dragImage(files) {
        const container = document.getElementsByClassName('image-container')[0];
        const url = URL.createObjectURL(files[0]);
        setImagem(files[0]);
        container.style.backgroundImage = `url(${url})`;
    }

    return (
        <>
            <header>
                <ul>
                    <li>
                        <Link to={{ pathname: "/produtos" }} className="link back-button">
                            <FiArrowLeft className="icon" />
                            <p>Voltar</p>
                        </Link>
                    </li>
                </ul>
            </header>

            <div className="container">
                <form onSubmit={create}>

                    <p className="title">Novo Usuario</p>

                    <Dropzone accept="image/*" onDropAccepted={dragImage}>
                        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (

                            <div className="image-container" {...getRootProps()}>
                                <FiCamera size={36} className="icon" />
                                <input {...getInputProps()} />
                            </div>

                        )}


                    </Dropzone>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="descricao">Senha</label>
                        <input
                            name="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <button className="button">Cadastrar</button>

                </form>
            </div>

        </>
    )
}