import CloseIcon from "@mui/icons-material/Close";
import SendIcon from '@mui/icons-material/Send';
import { Button, Grid2, IconButton, Snackbar } from "@mui/material";
import { Input } from "antd";
import React from "react";
import CommentManager from "../managers/CommentsManager";
import TaskManager from "../managers/TaskManager";

function CommitedSnakbar() {

    const [open, setOpen] = React.useState(false);
    const commentRef = React.createRef();
    let lastOne = TaskManager.getLastOne();

    TaskManager.setSnackBarOpenCallback(setOpen);

    function sendHandler() {
        setOpen(false);
        let comment = commentRef.current.input.value;
        CommentManager.add(comment, lastOne.task.id, lastOne.tik.id);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleUndo = (event, reason) => {
        setOpen(false);
        TaskManager.tikUndo(lastOne.tik);
    };

    const action = (

        <Grid2 container sx={{ paddingRight: 0, margin: 0 }} >

            <Grid2 size={8}>
                {lastOne ? lastOne.task.title : ''}
                :
                {lastOne ? lastOne.metric.icon+ " " +lastOne.metric.title : ''}
                &nbsp;
                {lastOne ? lastOne.tik.value : ''}
            </Grid2>
            <Grid2 size={4} align="right" >
                <Button color="secondary" size="small" onClick={handleUndo}>UNDO</Button>

                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Grid2>

            <Grid2 size={11}>
                <Input size={'small'} ref={commentRef}></Input>
            </Grid2>
            <Grid2 size={1} align="right">
                <SendIcon onClick={sendHandler} />
            </Grid2>

        </Grid2>

    );

    return <Snackbar
        sx={{ "& div.MuiSnackbarContent-action ": { margin: 0, padding: '1px' } }}
        open={open}
        autoHideDuration={60000}
        onClose={handleClose}
        action={action}
    />
}

export default CommitedSnakbar;