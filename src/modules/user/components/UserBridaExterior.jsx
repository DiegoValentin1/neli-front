import React, { useState, useEffect, useContext } from "react";
import {Row, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import AxiosClient from "../../../shared/plugins/axios";
import { AuthContext } from "../../auth/authContext";

const UserBridaExterior = ({ formikValues, setFormikValues, estilo, unidades }) => {
    const { user, dispatch } = useContext(AuthContext);
    const [espDiseño, setEspDiseño] = useState(0);
    const [espDiseño2, setEspDiseño2] = useState(0);
    const [espMin, setEspMin] = useState(0);
    const [espMin2, setEspMin2] = useState(0);
    const [valorEsfuerzoMinimoB, setValorEsfuerzoMinimoB] = useState(0);
    const [material, setMaterial] = useState([]);

    const form = useFormik({
        initialValues: {
            name: "",
            status: true,
        },
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required("Campo obligatorio")
                .min(3, "Minimo 3 caracteres"),
        }),
    });

    const calcularPresionTrabajo2Exp = () => {
        
        const primer = 2 * form.values.bridaM * user.proyecto.proyecto.espesorComercial2 * 0.9;
        const segundo = user.proyecto.proyecto.diametroDeSalidaReduccion;
        return (primer / segundo * user.proyecto.proyecto.factorDeDiseño * user.proyecto.proyecto.factorDeJuntaLongitudinal * user.proyecto.proyecto.factorDeTemperaturaDerating).toFixed(2)
    }

    const calcularPresionTrabajoExp = () => {
        
        const primer = 2 * form.values.bridaM * user.proyecto.proyecto.espesorComercial * 0.9;
        const segundo = user.proyecto.proyecto.diametroExterior;
        return (primer / segundo * user.proyecto.proyecto.factorDeDiseño * user.proyecto.proyecto.factorDeJuntaLongitudinal * user.proyecto.proyecto.factorDeTemperaturaDerating).toFixed(2)
    }

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/brida/",
            });
            if (!response.error) {
                setMaterial(response);
                return response;
            }
        };
        fetchMaterial();
    }, []);

    return (
        <div className="UserTeeRed" style={estilo}>
            <Form onSubmit={form.handleSubmit}>
                <div className="TeeRedContainer2Nuevo">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="material">Material</Form.Label>
                        <div className="inputGroup">
                        <Form.Select
                                className="TeeRedInputCompleto"
                                placeholder=""
                                name="bridaM"
                                value={form.values.bridaM}
                                onChange={form.handleChange}
                            >
                                <option value="">Selecciona un material</option>
                                {material.map((item) => (
                                    <option key={item.id} value={item.smys}>
                                        {item.grade}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>

                        {form.errors.material && (
                            <span className="error-text">{form.errors.material}</span>
                        )}
                    </Form.Group>
                </div>
                <div className="TeeRedContainer3">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="diametroExterior">Diametro Exterior</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="diametroExteriorComponente"
                                value={formikValues.diametroExterior}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>
                        {form.errors.diametroExteriorComponente && (
                            <span className="error-text">{form.errors.diametroExteriorComponente}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="diametroDeSalidaReduccion">D. Exterior Tubería</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="diametroExteriorTuberia"
                                value={formikValues.diametroDeSalidaReduccion}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.diametroExteriorTuberia && (
                            <span className="error-text">{form.errors.diametroExteriorTuberia}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="presionDeDiseño">Presion De Diseño</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="presionDeDiseñoB"
                                value={formikValues.presionDeDiseño}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.megaPascales}</div>
                        </div>

                        {form.errors.presionDeDiseñoB && (
                            <span className="error-text">{form.errors.presionDeDiseñoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="temperaturaDeDiseño">Temperatura De Diseño</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="temperaturaDeDiseñoB"
                                value={formikValues.temperaturaDeDiseño}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.celsius}</div>
                        </div>

                        {form.errors.temperaturaDeDiseñoB && (
                            <span className="error-text">{form.errors.temperaturaDeDiseñoB}</span>
                        )}
                    </Form.Group>
                </div>
                <div className="TeeRedContainer3">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="corrosionPermisible">Corrosion Permisible</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="corrosionPermisibleB"
                                value={formikValues.corrosionPermisible}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.corrosionPermisibleB && (
                            <span className="error-text">{form.errors.corrosionPermisibleB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="valorDeEsfuerzoMinimo">V. De Esfuerzo Min.</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="valorEsfuerzoMinimoB"
                                value={formikValues.valorEsfuerzoMinimo}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.megaPascales}</div>
                        </div>

                        {form.errors.valorDeEsfuerzoMinimoB && (
                            <span className="error-text">{form.errors.valorDeEsfuerzoMinimoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="factorDeDiseño">Factor De Diseño</Form.Label>
                        <div className="inputGroup">
                            <Form.Select
                                disabled={true}
                                className="TeeRedInputCompleto"
                                placeholder=""
                                name="factorDeDiseñoB"
                                value={form.values.factorDeDiseñoB}
                                onChange={form.handleChange}
                            >
                                <option selected value={"0.80"}>Location Class 1, Division 1</option>
                            </Form.Select>
                        </div>
                        {form.errors.factorDeDiseñoB && (
                            <span className="error-text">{form.errors.factorDeDiseñoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="factorDeJuntaLongitudinal">F. Junta Longitudinal</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="factorDeJuntaLongitudinalB"
                                value={formikValues.factorDeJuntaLongitudinal}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">U</div>
                        </div>

                        {form.errors.factorDeJuntaLongitudinalB && (
                            <span className="error-text">{form.errors.factorDeJuntaLongitudinalB}</span>
                        )}
                    </Form.Group>
                </div>
                <div className="TeeRedContainer3Nuevo">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="factorDeTemperaturaDerating">Factor Derating</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="factorDeTemperaturaDerating"
                                value={formikValues.factorDeTemperaturaDerating}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">U</div>
                        </div>
                        {form.errors.factorDeTemperaturaDerating && (
                            <span className="error-text">{form.errors.factorDeTemperaturaDerating}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeDiseño">Espesor De Diseño</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorDeDiseño"
                                value={!isNaN(formikValues.espDiseño) && !isNaN(formikValues.espDiseño2) ? `${parseFloat(formikValues.espDiseño.toFixed(2))} | ${parseFloat(formikValues.espDiseño2.toFixed(2))}` : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorDeDiseño && (
                            <span className="error-text">{form.errors.espesorDeDiseño}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorMinimoRequerido">Presion De Trabajo</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorMinimoRequerido"
                                value={!isNaN(calcularPresionTrabajo2Exp()) && !isNaN(calcularPresionTrabajoExp()) ? `${parseFloat(calcularPresionTrabajoExp())} | ${parseFloat(calcularPresionTrabajo2Exp())}` : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.megaPascales}</div>
                        </div>

                        {form.errors.espesorMinimoRequerido && (
                            <span className="error-text">{form.errors.espesorMinimoRequerido}</span>
                        )}
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}

export default UserBridaExterior;
