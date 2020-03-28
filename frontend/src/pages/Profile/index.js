import React, {useEffect, useState} from 'react';
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './style.css'

export default function Profile(){
    const [incidents, setIncidents]  = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ong_id');

    const history = useHistory();

    useEffect(()=>{
        api.get('profile',{
            headers : {
                Authorization : ongId,   
            }
        }).then( res => {
            setIncidents(res.data)
        })
    }, [ongId] );


    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers :{
                    Authorization : ongId,
                }
            });

            // atualiza a lista de incidente removento oq foi deletado no backend para nao precisar recarregar a consulta
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (error) {
            alert('erro ao deletar caso');
        }    
    }

   function handleLogout(){
        localStorage.clear();

        history.push('/');
   } 

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incidents.id}>
                    <strong>CASO</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency : 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>                        
                    </button>
                    </li>  
                ))}

            </ul> 

        </div>
    );
}