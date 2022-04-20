import React, {useState} from 'react';
import {Button, FormControl, TextField, Select, MenuItem, Container, InputLabel, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import {toast} from "react-toastify";
import fireDatabase from '../../data/firebase'
import {Save} from "@mui/icons-material";

const initialValues = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    courseType: '',
    subscriptionType: "",
    expireDate: ""
}


const UserForm = () => {
    const [form, setFormValues] = useState(initialValues);
    const {name, surname, phone, email, courseType, subscriptionType, expireDate} = form;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !surname || !phone || !courseType || !subscriptionType || !expireDate) {
            toast.error("Proszę wypełnij wszystkie pola")
        } else {
            fireDatabase.child("users").push(form, (err) => {
                if (err) {
                    toast.error("Błąd serwera");
                } else {
                    toast.success("Użytkownik dodany");
                    const timeout = setTimeout(() => {
                        clearFields(e);
                    }, 1_000);
                }
            });
        }

    }
    const clearFields = (e) => {
        e.preventDefault();
        setFormValues(initialValues);
    }

    return (
        <Container>
            <Paper sx={{padding: '1rem', margin: '2rem'}}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <TextField sx={{width: "100%"}} label={"Imię"} name={"name"} value={name}
                                   onChange={handleInputChange}></TextField>
                        <TextField sx={{width: "100%"}} label={"Nazwisko"} name={"surname"} value={surname}
                                   onChange={handleInputChange}></TextField>
                        <TextField sx={{width: "100%"}} label={"Numer telefonu"} type={"tel"} name={"phone"}
                                   value={phone}
                                   onChange={handleInputChange}></TextField>
                        <TextField sx={{width: "100%"}} label={"E-mail"} type={"email"} name={"email"} value={email}
                                   onChange={handleInputChange}></TextField>

                        <FormControl sx={{width: "100%"}}>
                            <InputLabel>Kurs</InputLabel>
                            <Select
                                label={"Nazwa kursu"}
                                id={"select-course"}
                                name="courseType"
                                value={courseType}
                                onChange={handleInputChange}>
                                <MenuItem key="Salsa" value="Salsa">Salsa</MenuItem>
                                <MenuItem key="Salsa kubańska" value="Salsa kubańska">Salsa kubańska</MenuItem>
                                <MenuItem key="Bachata" value="Bachata">Bachata </MenuItem>
                                <MenuItem key="Kizomba" value="Kizomba">Kizomba</MenuItem>
                                <MenuItem key="Mambo" value="Mambo">Mambo</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{width: "100%"}}>
                            <InputLabel>Rodzaj karnetu</InputLabel>
                            <Select
                                label={"Typ karnetu"}
                                id={"select-subscription"}
                                name="subscriptionType"
                                value={subscriptionType}
                                onChange={handleInputChange}>
                                <MenuItem key="Basic" value="Basic (4 wejścia)">Basic (4 wejścia)</MenuItem>
                                <MenuItem key="Premium" value="Premium (8 wejść)">Premium (8 wejść)</MenuItem>
                                <MenuItem key="Bachata" value="VIP (12 wejść)">VIP (12 wejść) </MenuItem>
                                <MenuItem key="Kizomba" value="Full Pass (bez limitu)">Full Pass (bez limitu)</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="date"
                            label="Ważny do:"
                            type="date"
                            name="expireDate"
                            value={expireDate}
                            sx={{width: "100%"}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                        />
                    </Stack>
                    <Stack sx={{margin: "1rem 0 0 0"}} direction="row" justifyContent="center" spacing={3}>
                        <Button variant={"contained"} size={"large"} color={"success"} type={"submit"}
                                endIcon={<Save/>}>Zapisz </Button>
                        <Button onClick={clearFields} variant={"contained"} size={"large"} color={"error"}
                                startIcon={<DeleteIcon/>}>Wyczyść</Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );

};

export default UserForm;