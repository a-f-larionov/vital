import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Fab, IconButton, Popper } from "@mui/material";
import React from "react";
import PageManager from "../../managers/PageManager";

function MetricRightMenu({ metric, task, tasks, setTasks }) {

    const [menuAnchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);
    const [currentMetric, setCurrentMetric] = React.useState(null);

    const menuHandleClick = (event, metric) => {
        if (menuAnchorEl === null) {
            setAnchorEl(event.currentTarget);
            setCurrentMetric(metric);
        } else {
            menuHandleClose();
        }
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
        setCurrentMetric(null);
    };

    function onEditMenuClick({ metric, task, tasks, setTasks }) {
        PageManager.setPage(PageManager.PAGE_EDIT_TIKS, task.title + " > " + currentMetric.title + currentMetric.icon, task, currentMetric);
    }

    return (
        <ClickAwayListener onClickAway={menuHandleClose}>
            <Box key={metric.id} sx={{ minWidth: 0, margin: 0, paddingRight: 0 }}>

                <Popper
                    id="menu{metric.id}"
                    placement="left"
                    open={menuOpen}
                    anchorEl={menuAnchorEl}
                    onClose={menuHandleClose}
                    sx={{ '& > :not(style)': { marginLeft: '8px', backgroundColor: '#fff' } }}>
                    <Fab size='small'>
                        <EditIcon onClick={() => onEditMenuClick({ currentMetric, task, tasks, setTasks })} color='primary' />
                    </Fab>
                </Popper>

                <IconButton
                    aria-controls={menuOpen ? ('menu' + metric.id) : undefined}
                    aria-expanded={menuOpen ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => menuHandleClick(e, metric)}
                    sx={{ padding: 0, margin: 0, height: 15 }}
                >
                    <MoreVertIcon sx={{ padding: 0, margin: 0 }} />
                </IconButton>
            </Box>
        </ClickAwayListener>
    );
}

export default MetricRightMenu;