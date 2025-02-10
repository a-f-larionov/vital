import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from '@mui/icons-material/History';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Grid2, IconButton, Snackbar } from "@mui/material";
import { Input } from "antd";
import React from "react";
import CommentManager from "../../managers/CommentsManager";
import TaskManager from "../../managers/TaskManager";
import utils from "../../utils";

import MaterialSelector from "./MaterialSelector";
import TaskSelector from "./TaskSelector";

function CommitedSnakbar() {

    const [open, setOpen] = React.useState(false);
    const commentRef = React.createRef();
    let lastOne = TaskManager.lastOne;
    let task = lastOne.taskId ? TaskManager.tasks.find((task) => lastOne.taskId === task.id) : null;
    let metrics = task ? task.metrics.filter((metric) => lastOne.metricIds.includes(metric.id)) : null;

    TaskManager.setSnackBarOpenCallback(setOpen);

    function sendHandler() {
        setOpen(false);
        let comment = commentRef.current.input.value;
        CommentManager.add(comment, task.id);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleUndo = (tik) => {
        lastOne.metricIds = lastOne.metricIds.filter(id => id !== tik.mid);
        if (lastOne.metricIds.length === 0) {
            setOpen(false);
            lastOne = {};
        }
        TaskManager.setLastOne(lastOne);
        TaskManager.tikUndo(tik);
    };

    function materialOnChange(material) {
        console.log("set ",material);
    }

    const action = (

        <Grid2 container sx={{ paddingRight: 0, margin: 0 }} >

            <Grid2 size={8}>

                <MaterialSelector onChangeValue={materialOnChange} />

                <TaskSelector onChangeValue={materialOnChange} />

            </Grid2>

            <Grid2 size={8}>
                {task ? task.title : ''}
                :
                {metrics ? metrics
                    .map(metric => {
                        let metricTitle = metric.icon + " " + metric.title;
                        let tik = metric.tiks.sort((a, b) => b.datetime - a.datetime)[0];
                        let value = tik.value;
                        if (metric.typeCode === 'timestamp') {
                            value = utils.s2hms(value, true);
                        }

                        return <Box key={metric.id}>
                            {metricTitle} {value}
                            <Button color="secondary" size="small" onClick={() => handleUndo(tik)}><HistoryIcon /></Button>
                        </Box>;
                    }) : ''}
            </Grid2>
            <Grid2 size={4} align="right" >

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
        sx={{ "& div.MuiSnackbarContent-action ": { margin: 0, padding: '1px' }, width: '100 %' }}
        open={open}
        aria-hidden={true}
        autoHideDuration={50000}
        onClose={handleClose}
        action={action}
    />

}

export default CommitedSnakbar;