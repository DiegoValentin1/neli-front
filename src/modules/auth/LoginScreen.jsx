import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import * as yup from "yup";
import AxiosClient from "../../shared/plugins/axios";
import {Form, Button } from "react-bootstrap";
import '../../utils/styles/login.css'

export const LoginScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (credencialesValidas) => {
    // Realizar verificación de las credenciales aquí
    // Simulando un retraso de 2 segundos antes de mostrar el resultado
    setTimeout(() => {
      if (credencialesValidas) {
        setSuccess(true);
        setTimeout(() => {
          // Redirigir a otra parte
          navigation("/", { replace: true });
        }, 2000);
      } else {
        setFailure(true);
        setTimeout(() => {
          setExpanded(false);
          setFailure(false);
        }, 2000);
      }
    }, 2000);

    setExpanded(true);
  };
  const navigation = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
      //password2: yup.string().required("Campo obligatorio").oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    }),
    onSubmit: async (values) => {
      setExpanded(!expanded);
      console.log("Valores: ");
      console.log(values);
      try {
        const response = await AxiosClient({
          url: "/auth/",
          method: "POST",
          data: JSON.stringify(values),
        });
        if (!response.error) {
          const action = {
            type: "LOGIN",
            payload: { data: response },
          };
          dispatch(action);
          handleLogin(true);
        }
      } catch (err) {
        console.log(err);
        handleLogin(false);
      }
    },
  });
  useEffect(() => {
    document.title = "MPGIA | Login";
  }, []);
  // if (user.isLogged) {
  //   return <Navigate to={"/"} />;
  // }
  return (
    <div className="loginMainFrame">
      <div className={`loginContainer ${expanded ? 'expandedContainer' : ''}`}>
        <div className={`loginLeftContainer ${expanded ? 'expandedL' : ''}`}>
          <img className="loginMpgiaLogo" src={require('../../utils/img/fgIcon.png')} alt="" />
          {isLogin ?
            <div className="formContainer">
              <div className="formTitle">FG</div>
              <div className="formBien">Bienvenido</div>
              <Form className="loginSelect" onSubmit={formik.handleSubmit}>
                <Form.Group className="form-outline mb-1">
                  <Form.Label htmlFor="username">
                    Usuario
                  </Form.Label>
                  <Form.Control
                    placeholder="usuario"
                    id="username"
                    autoComplete="off"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.username ? (
                    <span className="error-text">
                      {formik.errors.username}
                    </span>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-outline mb-4">
                  <Form.Label htmlFor="password">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    placeholder="********"
                    id="password"
                    autoComplete="off"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type='password'
                  />
                  {formik.errors.password ? (
                    <span className="error-text">
                      {formik.errors.password}
                    </span>
                  ) : null}
                </Form.Group>
                <Form.Group className='form-outline mb-1'>
                  <div className="text-center pt-1 pb-1 formBoton">
                    <Button
                      onClick={()=>setExpanded(!expanded)}
                      className='btn-hover gradient-custom-2 formBoton'
                      type="submit"
                      disable={!(formik.isValid && formik.dirty)}
                    >
                      INICIAR
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-outline">
                  <div className="text-center pt-1 pb-1">
                    <p href="#!" className="text-muted formCuenta">
                      ¿Olvidaste tu contraseña?
                    </p>
                  </div>
                </Form.Group>
                <Form.Group className="form-outline mb-4">
                  <div className="text-center pt-1 pb-1">
                    <p href="#!" className="text-muted formCuenta" onClick={()=>setIsLogin(!isLogin)} >
                      ¿No tienes cuenta?
                    </p>
                  </div>
                </Form.Group>
              </Form>
            </div> :
            <div className="formContainer">
              <div className="formTitle">FG</div>
              <div className="formBien">Registro</div>
              <Form className="loginSelect" onSubmit={formik.handleSubmit}>
                <Form.Group className="form-outline mb-1">
                  <Form.Label htmlFor="email">
                    Usuario
                  </Form.Label>
                  <Form.Control
                    placeholder="correo@dominio.com"
                    id="email"
                    autoComplete="off"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <span className="error-text">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-outline mb-1">
                  <Form.Label htmlFor="password">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    placeholder="********"
                    id="password"
                    autoComplete="off"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type='password'
                  />
                  {formik.errors.password ? (
                    <span className="error-text">
                      {formik.errors.password}
                    </span>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-outline mb-4">
                  <Form.Label htmlFor="password">
                    Confirmar Contraseña
                  </Form.Label>
                  <Form.Control
                    placeholder="********"
                    id="password2"
                    autoComplete="off"
                    name="password2"
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                    type='password'
                  />
                  {formik.errors.password2 ? (
                    <span className="error-text">
                      {formik.errors.password2}
                    </span>
                  ) : null}
                </Form.Group>
                <Form.Group className='form-outline mb-1'>
                  <div className="text-center pt-1 pb-1 formBoton">
                    <Button
                      onClick={()=>setExpanded(!expanded)}
                      className='btn-hover gradient-custom-2 formBoton'
                      type="submit"
                      disable={!(formik.isValid && formik.dirty)}
                    >
                      INICIAR
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-outline">
                  <div className="text-center pt-1 pb-1">
                    <p href="#!" className="text-muted formCuenta">
                      ¿Olvidaste tu contraseña?
                    </p>
                  </div>
                </Form.Group>
                <Form.Group className="form-outline mb-4">
                  <div className="text-center pt-1 pb-1">
                    <p href="#!" className="text-muted formCuenta" onClick={()=>setIsLogin(!isLogin)}>
                      ¿Ya tienes cuenta?
                    </p>
                  </div>
                </Form.Group>
              </Form>
            </div>}
          <div className="loginCopyRight">
            © 2023 Foster Games. All rights reserved
          </div>
        </div>

        <div className={`loginRightContainer ${expanded ? 'expandedR' : ''}`}>
          {/* <img className="loginImg" src={require('../../utils/img/prueba.png')} alt="" /> */}
          {success && (
            <div className="success">
              <div class="wrapper"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
              </div>
              <div className="loginImgText" style={{ color: "#333", width: "100%" }}>Inicio Exitoso</div>
            </div>
          )}
          {failure && (
            <div className="failure">
              <div className="wrapper">
                <svg class="checkmarkX" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark_circleX" cx="26" cy="26" r="25" fill="none" /><path class="checkmark_checkX" fill="#C52929" d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8" /></svg>
              </div>
              <div className="loginImgText" style={{ color: "#333", width: "100%" }}>Validar Datos</div>
            </div>
          )}
          {!success && !failure && expanded && (
            <React.Fragment>
              <div className="logo">
                {/* <img className="loginMpgiaLogo" src={require('../../utils/img/mpgialogo.png')} alt="" /> */}
                <div class="progress-bar">
                  <div class="progress"></div>
                </div>
              </div>
            </React.Fragment>
          )}
          <div className="loginImgText" style={expanded ? { display: "none" } : {}}>Cambia la Forma en la Que Calculas Espesores</div>
          <div className="loginTextSmall" style={expanded ? { display: "none" } : {}}>Sistema de Cálculo y Generación de Reportes</div>
        </div>
      </div>
    </div>
  );
};
