import React, { useContext, useEffect, useState } from 'react';
import AxiosClient from '../../shared/plugins/axios';
import { AuthContext } from '../auth/authContext';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PlatformForm from './components/PlatformForm';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

const PlatformScreen = () => {
    const user = useContext(AuthContext)
    const { token } = user;
    const [platforms, setPlatforms] = useState([]);
    const [showModalPlatform, setShowModalPlatform] = useState(false);

    const getAllPlatform = async () => {
        try {
            const response = await AxiosClient({
                url: "/plataforma/",
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            setPlatforms(response);
        } catch (error) {
            console.log(error);
        }
    }
    const changeStatus = async (id) => {
        try {
            const response = await AxiosClient({
                url: `/plataforma/status/${id}`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            console.log(error)
        } finally {
            getAllPlatform();
        }
    }
    useEffect(() => {
        getAllPlatform();
    }, []);
    const columns = React.useMemo(() => [
        {
            name: "ID",
            selector: (row) => row.id,
        },
        {
            name: "Plataforma",
            selector: (row) => row.plataforma,
            sortable: true,
            fixed: true,
        },
        {
            name: "Estatus",
            cell: (row) =>
                row.status ? (
                    <Badge bg="success"> ACTIVO </Badge>
                ) : (
                    <Badge bg="danger">INACTIVO</Badge>
                ),
        },
        {
            name: "ACCIONES",
            cell: (row) => (
                <>
                    <Button
                        variant='warning'
                        type="btn btn-outline-warning btn-circle me-1"
                        size={16}
                    // onClick={() => {
                    //   setIsEditting(true);
                    //   setSelectedFamily(row);
                    // }}
                    ><FeatherIcon icon={'edit'}/></Button>
                    {row.status ? (
                        <Button
                            variant='danger'
                            size={15}
                            onClick={() => changeStatus(row.id)}
                        ><FeatherIcon icon={'trash'} /></Button>
                    ) : (
                        <Button
                            variant='success'
                            size={15}
                            onClick={() => changeStatus(row.id)}
                        ><FeatherIcon icon={'save'} /></Button>
                    )}
                </>
            ),
        },

    ]);
    return (
        < >
            <div style={{ justifyContent: 'ceneter', alignItems: "center", backgroundColor: "transparent", height: "92vh", padding: 20 }}>
                <div>
                    <div className="App">
                        <DataTable


                            title={

                                <div style={{ display: "flex", flexDirection: "row" }}>

                                    <div style={{ width: "95%", paddingTop: 3 }}>
                                        Plataforma
                                    </div>

                                    <div >
                                        <FeatherIcon className='DataIcon' icon={'plus'} onClick={() => setShowModalPlatform(true)} style={{ height: 40, width: 40 }} />
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={platforms}
                            pagination
                            highlightOnHover
                            paginationPerPage={8}
                            paginationComponentOptions={{
                                rowsPerPageText: '',
                                noRowsPerPage: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            <PlatformForm
                isOpen={showModalPlatform}
                data={getAllPlatform}
                token={token}
                onClose={() => setShowModalPlatform(false)} />
        </>
    );
}

export default PlatformScreen;
