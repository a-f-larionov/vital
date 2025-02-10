import CategoryIcon from "@mui/icons-material/Category";
import { Box, ClickAwayListener, IconButton, Popper, Paper, List, MenuItem } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';

import React from 'react';

function TaskSelector({ onChangeValue }) {

    const [chooseMaterialOpen, setchooseMaterialOpen] = React.useState(false)
    const [chooseMaterialAnchor, setchooseMaterialAnchor] = React.useState(null);

    function chooseMaterial(e) {
        if (e === false) {
            setchooseMaterialAnchor(null);
            setchooseMaterialOpen(false);
        } else {
            setchooseMaterialAnchor(chooseMaterialAnchor ? null : e.currentTarget);
            setchooseMaterialOpen(!chooseMaterialOpen);
        }
    }

    return <ClickAwayListener onClickAway={() => { chooseMaterial(false); }}>
        <Box sx={{ display: 'inline' }}>
            <IconButton color="success" onClick={(e) => chooseMaterial(e)} sx={{fontSize:16}}> <TaskAltIcon /> Не выбрано</IconButton>

            <Popper
                open={Boolean(chooseMaterialOpen)}
                anchorEl={chooseMaterialAnchor}
                // sx={sxPopper}
                placement="top-start"
            >
                <Paper elevation={5}>
                    <List>
                        <MenuItem>Не выбрано</MenuItem>
                        <MenuItem><AddIcon /></MenuItem>
                    </List>
                </Paper>
            </Popper>
        </Box>
    </ClickAwayListener>
}

export default TaskSelector;
