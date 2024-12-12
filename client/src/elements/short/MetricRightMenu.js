import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Fab, IconButton, Popper } from "@mui/material";
import React from "react";
import PageManager from "../../managers/PageManager";

const sxBox = { minWidth: 0, margin: 0, paddingRight: 0 };
const sxButton = { padding: 0, height: 15 };
const sxPopper = { '& > :not(style)': { marginLeft: '8px', backgroundColor: '#fff' } };

function MetricRightMenu({ task, metric }) {
    const [anchorlEl, setAnchorEl] = React.useState(null);

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box key={metric.id} sx={sxBox}>

                <IconButton sx={sxButton}
                    onClick={(e) => setAnchorEl(anchorlEl === null ? e.currentTarget : null)}>
                    <MoreVertIcon />
                </IconButton>

                <Popper
                    open={Boolean(anchorlEl)}
                    anchorEl={anchorlEl}
                    sx={sxPopper}
                    placement="left"
                >
                    <Fab size='small' onClick={() => MetricRightMenu.onClickEdit(task, metric)} >
                        <EditIcon color='primary' />
                    </Fab>
                </Popper>

            </Box>
        </ClickAwayListener>
    );
}

MetricRightMenu.onClickEdit = function (task, metric) {
    PageManager.setPage(PageManager.PAGE_EDIT_TIKS, task.title + " > " + metric.title + metric.icon, task, metric);
}

export default MetricRightMenu;