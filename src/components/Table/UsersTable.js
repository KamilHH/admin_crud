import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import fireDatabase from "../../data/firebase";
import {toast} from "react-toastify";
import {Grid} from "@mui/material";
import {columns, localization} from "./UsersTableData";

const UsersTable = () => {
    const [data, setData] = useState([]);

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
        <Grid container >
            <Grid item xs={10} sx={{margin: '2rem auto', zIndex:'1'}}>
                <MaterialTable
                    title=""
                    columns={columns}
                    options={{
                        pageSize: 5,
                        actionsColumnIndex: -1,
                    }}
                    data={data}
                    localization={localization}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setData([...data, newData]);
                                    resolve();
                                }, 1000)
                                fireDatabase.child('users').push(newData, (err) => {
                                    err ? toast.error("Nie udało się dodać użytkownika") : toast.success("Użytkownik dodany")
                                })
                                    .catch(err => console.log("Error: " + err.message()))
                            }),
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
    );
};

export default UsersTable;