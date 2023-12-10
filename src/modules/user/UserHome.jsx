import React, { useContext, useEffect } from 'react';
import '../../utils/styles/UserStyles.css';
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import { AuthContext } from '../auth/authContext';

const UserHome = () => {
    const user = useContext(AuthContext);

    useEffect(() => {
        cargarDatos();
        console.log(user);
    }, []);

    const cargarDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/proyecto/",
                method: "GET",
            });

            console.log(response);
            if (!response.error) {
                
            }
        } catch (err) {
            Alert.fire({
                title: "VERIFICAR DATOS",
                text: "USUARIO Y/O CONTRASEÑA INCORRECTOS",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
            console.log(err);
        }
    }
    return (
        <div className='UserMainContainer'>
            <div className='UserJuegos'>
                <div>Top juegos</div>
                <div className="UserCarrusel">
                    <div class="item"><img src={require('../../utils/img/mpgiaLogoColorLogo.jpg')} alt="Imagen 1"></img></div>
                    <div class="item"><img src={require('../../utils/img/mpgiaLogoColorLogo.jpg')} alt="Imagen 2"></img></div>
                    <div class="item"><img src={require('../../utils/img/mpgiaLogoColorLogo.jpg')} alt="Imagen 3"></img></div>
                    <div class="item"><img src={require('../../utils/img/mpgiaLogoColorLogo.jpg')} alt="Imagen 2"></img></div>
                    <div class="item"><img src={require('../../utils/img/mpgiaLogoColorLogo.jpg')} alt="Imagen 3"></img></div>
                    <div class="item"><img src={require('../../utils/img/mpgiaLogoColorLogo.jpg')} alt="Imagen 1"></img></div>
                    <div class="item"><img src={require('../../utils/img/mpgiaLogoColorLogo.jpg')} alt="Imagen 2"></img></div>
                </div>
            </div>
            <div className='UserJuegos'>
                <div>Recomendados</div>
                <div className="UserCarrusel">
                    
                </div>
            </div>
            <div className='UserJuegos'>
                <div>Recien añadidos</div>
                <div className="UserCarrusel">

                </div>
            </div>
        </div>
    );
}

export default UserHome;
