import React, { useState} from 'react';
import Box from "@mui/material/Box";
import {style} from "../Table/UsersTableData";
import {Button,Stack, FormControl, TextField, InputLabel} from "@mui/material";
import Modal from "@mui/material/Modal";
import {toast} from "react-toastify";


const LoginModal = () => {
    const [open, setOpen] = useState(true);
    const [username, setUsername] = useState("");


    const handleLogin = (e) =>  {
        e.preventDefault()
        if (!username) {
            toast.error("Musisz podać imię")
        }else {
            localStorage.setItem("username", username)
            setOpen(!open)
            toast.success(`Witaj ${username}!`)


        }
    }

    return (
        <div>
            <Modal
                open={open}
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2}>
                        <InputLabel>ADMIN PANEL</InputLabel>
                        <FormControl onSubmit={handleLogin}>
                            <TextField required label={"Podaj imię"} name={"username"} onChange={e => setUsername(e.target.value)}></TextField>
                        </FormControl>
                        <Button variant="outlined" color="error" type={"submit"} onClick={handleLogin}>Zaloguj</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};

export default LoginModal;