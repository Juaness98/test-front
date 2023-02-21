import React, {useEffect, useState} from "react";
import Menu from "./Menu";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import {useSelector} from "react-redux";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const API_URL = 'http://localhost:3001/';

function Company() {

    const auth = useSelector(state => state.auth)

    const config = {
        headers: {Authorization: `Bearer ${auth.userToken}`}
    }

    const initialCompany = { name: '', direction: '', nit: '', phoneNumber: '' }
    const initialArticle = { name: ''}

    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState(initialCompany)
    const [disable, setDisable] = useState(false)
    const [companyId, setCompanyId] = useState(0)
    const [articles, setArticles] = useState([])
    const [article, setArticle] = useState(initialArticle)

    useEffect(() => {
        getAllCompanies()

    }, [])

    const getAllCompanies = async () => {
        try {
            await axios.get(`${API_URL}company`, config).then(res => setCompanies(res.data))
        } catch (e) {

        }
    }

    const handleChange = e => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        })
    }

    const handleChange2 = e => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createCompany()
    }

    const handleSubmit2 = (e) => {
        e.preventDefault()
        createArticle()
    }

    const createCompany = async () => {
        try {
            if (!disable) {
                await axios.post(`${API_URL}company`, company, config).then(res => {
                    const data = res.data
                    setCompanies(res => [...res, data])
                })
            } else {
                const nit = company.nit
                delete company.nit
                setCompany(company)
                await axios.patch(`${API_URL}company/${nit}`, company, config).then(res => {
                    const arr = [...companies]
                    const index = arr.findIndex(item => item.nit === nit)
                    arr[index] = res.data
                    setCompanies(arr)
                })
            }
            setCompany(initialCompany)
            setDisable(false)
        } catch (e) {

        }
    }

    const toEditCompany = async (nit) => {
        try {
            await axios.get(`${API_URL}company/${nit}`, company, config).then(res => {
                setCompany(res.data)
                setDisable(true)
            })
        } catch (e) {

        }
    }

    const createArticle = async () => {
        try {
            const body = {
                companyId,
                ...article
            }
            await axios.post(`${API_URL}articles`, body, config).then(res => {
                setArticles(articles => [...articles, res.data])
                setArticle(initialArticle)
            })
        } catch (e) {

        }
    }

    const deleteCompany = async (nit) => {
        try {
            await axios.delete(`${API_URL}company/${nit}`, config).then(res => {
                if(res.data){
                    const arr = [...companies]
                    const arrIndex = arr.findIndex(item => item.nit === nit)
                    arr.splice(arrIndex, 1)
                    setCompanies(arr)
                }
            })
        } catch (e) {

        }
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = async (id) => {
        setCompanyId(id)
        await getAllArticles(id)
        setOpen(true);
    }

    const getAllArticles = async (id) => {
        try {
            await axios.get(`${API_URL}articles/${id}`, config).then(res => setArticles(res.data))
        } catch (e) {

        }
    }

    const deleteArticle = async (id) => {
        try {
            await axios.delete(`${API_URL}articles/${id}`, config).then(res => {
                const arr = [...articles]
                const arrIndex = arr.findIndex(item => item.id === id)
                arr.splice(arrIndex, 1)
                setArticles(arr)
            })
        } catch (e) {

        }
    }

    const handleClose = () => {
        setCompanyId(null)
        setOpen(false);
        setArticle(initialArticle)
        setArticles([])
    };

    return (
        <>
            <Menu/>
            <div>
                <h3>Crear una empresas</h3>

            </div>
            <Container fixed>


                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        id="outlined-size-small"
                        size="small"
                        name='name'
                        onChange={handleChange}
                        value={company.name}
                    />
                    <TextField
                        label="Direction"
                        id="outlined-size-small"
                        size="small"
                        name='direction'
                        onChange={handleChange}
                        value={company.direction}
                    />
                    <TextField
                        label="NIT"
                        id="outlined-size-small"
                        size="small"
                        name='nit'
                        onChange={handleChange}
                        disabled={disable}
                        value={company.nit}
                    />
                    <TextField
                        label="Phone number"
                        id="outlined-size-small"
                        size="small"
                        name='phoneNumber'
                        onChange={handleChange}
                        value={company.phoneNumber}
                    />
                    <Button type='submit' variant="contained">Save</Button>
                </form>
            </Container>

            {
                companies.length <= 0 ? <h1>Not found</h1>
                    :
                    <>
                        <h3>Listado de Empresas</h3>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 200, padding: "18%"}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name </TableCell>
                                        <TableCell align="right">Direction</TableCell>
                                        <TableCell align="right">NIT</TableCell>
                                        <TableCell align="right">Phone number</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        companies?.map((c) => (
                                            <TableRow
                                                key={c.nit}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {c.name}
                                                </TableCell>
                                                <TableCell align="right">{c.direction}</TableCell>
                                                <TableCell align="right">{c.nit}</TableCell>
                                                <TableCell align="right">{c.phoneNumber}</TableCell>
                                                {auth.userInfo?.role === "1" ?
                                                    <TableCell align="right">
                                                        <Button onClick={() => handleClickOpen(c.nit)}
                                                                style={{background: "green"}} variant="contained"
                                                                endIcon={<AddIcon/>}>Article</Button>
                                                        <Button onClick={() => toEditCompany(c.nit)} variant="contained"
                                                                endIcon={<EditIcon/>}>Edit</Button>
                                                        <Button onClick={() => deleteCompany(c.nit)}
                                                                style={{background: "red"}} variant="contained"
                                                                endIcon={<DeleteIcon/>}>Delete</Button>
                                                    </TableCell> : null
                                                }

                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
            }


            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle>
                    Add article
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                            onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <form onSubmit={handleSubmit2}>
                            <TextField
                                label="Name"
                                id="outlined-size-small"
                                size="small"
                                name='name'
                                onChange={handleChange2}
                                value={article.name}
                            />
                            <Button type='submit' variant="contained">Save</Button>
                        </form>

                        <List sx={{ left: "5px", width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                articles.map((article) => {

                                return (
                                    <ListItem
                                        key={article.id}
                                        disableGutters
                                        secondaryAction={
                                            <IconButton onClick={() => deleteArticle(article.id)} aria-label="comment">
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText primary={article.name} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Company