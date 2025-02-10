import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Dialog, DialogTitle, DialogActions, DialogContent, Grid2, Button, Input, Box, ClickAwayListener, IconButton, Popper, Paper, List, MenuItem } from "@mui/material";
import React from 'react';
import MaterialManager from "../../managers/MaterialManager";

function MaterialSelector({ onChangeValue }) {

    const [popperOpen, setPopperOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [popperAnchorEl, setPopperAnchorEl] = React.useState(null);

    const [title, setTitle] = React.useState("");

    function togglePopper(e) {
        if (e === false) {
            setPopperAnchorEl(null);
            setPopperOpen(false);
            setDialogOpen(false);
        } else {
            setPopperAnchorEl(popperAnchorEl ? null : e.currentTarget);
            setPopperOpen(!popperOpen);
        }
    }

    function toggleDialog() {
        setDialogOpen(!dialogOpen);
    }

    function dialogHandleClose() {
        setDialogOpen(false);
    }

    function onChangeHandler(value) {
        togglePopper(false);
        setTitle(value ? value.title : "не выбрано");
        onChangeValue(value);
    }

    return <ClickAwayListener onClickAway={() => { togglePopper(false); }}>
        <Box sx={{ display: 'inline' }}>
            <IconButton color="success" onClick={(e) => togglePopper(e)} sx={{ fontSize: 16 }} > <CategoryIcon />
                {title}
            </IconButton>

            <Popper
                open={Boolean(popperOpen)}
                anchorEl={popperAnchorEl}
                placement="top-start"
            >
                <Paper elevation={5}>
                    <List>
                        <MenuItem onClick={() => { toggleDialog(); }}><AddIcon /></MenuItem>
                        <MenuItem onClick={() => onChangeHandler(null)}>не выбрано</MenuItem>
                        {MaterialManager.materials.map(material => {
                            return <MenuItem onClick={() => onChangeHandler(material)} key={material.id}>{material.title}</MenuItem>
                        })}
                    </List>
                </Paper>
            </Popper>

            <Dialog
                open={dialogOpen}
                onClose={dialogHandleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();

                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());

                        MaterialManager.add(formJson.title);

                        dialogHandleClose();
                    },
                }}
            >
                <DialogTitle>Материал</DialogTitle>
                <DialogContent sx={{ flexGrow: 1 }}>
                    <Grid2 container spacing={1} width={400}>
                        <Grid2 size={4}>Название:</Grid2>
                        <Grid2 size={8}>
                            <Input autoFocus required fullWidth type="text"
                                margin="dense" label="Название" variant="standard"
                                name="title" defaultValue="" />
                        </Grid2>
                    </Grid2>

                </DialogContent>

                <DialogActions>
                    <Button onClick={dialogHandleClose}>
                        <CloseIcon />
                    </Button>
                    <Button type="submit">
                        <CheckIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    </ClickAwayListener >

}

export default MaterialSelector;
