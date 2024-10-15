import React, { useState } from "react";
import { IconButton, AppBar, Avatar, Box, Button, Grid2, Popper, Snackbar, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from '@mui/icons-material/Send';
import TextArea from "antd/es/input/TextArea";
import { Input } from "antd";

function CommitedSnakbar() {

    const [open, setOpen] = React.useState(true);


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (

        <Grid2 container sx={{ paddingRight: '16px' }}>
            <Grid2 size={11}>
                <Input size={'small'}    ></Input>

            </Grid2>
            <Grid2 size={1}>
                <SendIcon />
            </Grid2>
            <Grid2 size={8}/>
            <Grid2 size={4}>
                <Button color="secondary" size="small"
                    onClick={handleClose}
                > UNDO</Button>

                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Grid2>
        </Grid2>

    );

    return <Snackbar
        open={open}
        autoHideDuration={600}
        message="Metric Commited"
        onClose={handleClose}
        action={action}
    />
}

export default CommitedSnakbar;