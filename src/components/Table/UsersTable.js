import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import fireDatabase from "../../data/firebase";
import {toast} from "react-toastify";
import {Grid} from "@mui/material";
import { localization, style} from "./UsersTableData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "react-avatar";


 const UsersTable = () => {
    const columns = [
    {title: 'ID', field: 'id', hidden: true,},
    {
        title: "Avatar",
        render: rowData => <Avatar  onClick={handleOpen} maxInitials={2} size={40} round={true}
                                         name={`${rowData.name} ${rowData.surname}`}/>,
    },
    {title: 'Imię', field: 'name', },
    {title: 'Nazwisko', field: 'surname', },
    {title: 'Numer telefon', field: 'phone', },
    {title: 'E-mail', field: 'email', },
    {title: 'Typ zajęć', field: 'courseType', },
    {title: "Rodzaj karnetu", field: 'subscriptionType', },
    {title: 'Ważny do:', field: 'expireDate',},
]

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fireDatabase.child("users").on("value", (snapshot) => {
            const arr = Object.keys(snapshot.val()).map(key => ({
                id: key,
                ...(snapshot.val()[key])
            })) || [];
            setData(arr)
        })
    }, []);

    return (
        <>

            <Grid container>
                <Grid item xs={10} sx={{margin: '2rem auto', zIndex: '1', }}>
                    <MaterialTable
                        title=""
                        columns={columns}
                        options={{
                            pageSize: 10,
                            actionsColumnIndex: -1,
                        }}
                        data={data}
                        localization={localization}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setData([...dataUpdate]);
                                        resolve();
                                    }, 1000)
                                    fireDatabase.child(`users/${oldData.id}`).set(newData, (err) => {
                                        err ? toast.error("Nie udało sie zmienić danych") : toast.success("Dane zmienione")
                                    })
                                        .catch(err => console.log("Error: " + err.message()))
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        setData([...dataDelete]);
                                        resolve();
                                    }, 1000)
                                    fireDatabase.child(`users/${oldData.id}`).remove((err) => {
                                        err ? toast.error("Nie udało się usunąć") : toast.success("Dane pomyślnie usunięte")
                                    })
                                        .catch(err => console.log("Error: " + err.message()))
                                }),
                        }}
                    />
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1>Imię i nazwisko</h1>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Dane użytkownika
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default UsersTable;