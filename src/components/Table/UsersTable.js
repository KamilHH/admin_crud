import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import fireDatabase from "../../data/firebase";
import {toast} from "react-toastify";
import {Button, Grid, Stack} from "@mui/material";
import {columns, localization, style} from "./UsersTableData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {Info} from "@mui/icons-material";


 const UsersTable = () => {


    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [single, setSingle] = useState(null);
    const handleOpen = () => setOpen(!open);

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
                <Grid item xs={11} sx={{margin: '2rem auto', zIndex: '1', }}>
                    <MaterialTable
                        title=""
                        columns={columns}
                        options={{
                            pageSize: 8,
                            actionsColumnIndex: -1,
                        }}
                        data={data}
                        actions={[
                            {
                                icon: () => <Info/>,
                                onClick: (event, rowData) => {
                                    handleOpen(true)
                                    setSingle(rowData)
                                }
                            }
                        ]}
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
                children={true}
                open={open}
            >
                {single && <Box sx={style}>
                    <Stack direction="column" spacing={2} >
                        <Typography id="modal-modal-title" variant="h5" component="div"  >
                            {single.name} {single.surname}
                        </Typography>
                        <Typography  id="modal-modal-description" sx={{mt: 2,display:'flex',flexDirection:'column'}}>
                            <strong> Telefon: {single.phone}</strong>
                            <strong> E-mail: {single.email}</strong>
                            <strong> Typ zajęć: {single.courseType}</strong>
                            <strong> Rodzaj karnetu: {single.subscriptionType}</strong>
                            <strong> Ważny do: {single.expireDate}</strong>
                        </Typography>
                        <Button variant="outlined" color="error" onClick={handleOpen}>Zamknij</Button>
                    </Stack>
                </Box>}
            </Modal>
        </>
    );
};

export default UsersTable;