import { Box, Input, Button, Stack } from "@mui/material";
import React from "react";
import TaskManager from "./TaskManager";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popper from "@mui/material/Popper";
import { IconButton, Fab } from "@mui/material";
import { Slider } from 'antd';
import { theme } from "antd";
import { alpha } from '@mui/material';

function TaskMenu2({ task, tasks, setTasks }) {

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [sVal, setSVal] = React.useState(0);
    const [sMax, setSMax] = React.useState(60);


    const sliderOnChange = (value) => {
        setSVal(value);
        setMenuOpen(true);
    };

    const sliderOnComplete = (value) => {
        setMenuOpen(false);
        if (value > 0) {
            setSVal(0);
            TaskManager.commitNumber(task, tasks, setTasks, value);
        }
    }

    function onNumberCommit({ task, tasks, setTasks }) {
        let amount = parseInt(magicInputRef.current.value);
        TaskManager.commitNumber(task, tasks, setTasks, amount);
    }

    function onIncrementClick({ task, tasks, setTasks }) {
        TaskManager.increment(task, tasks, setTasks);
    }

    let inputRef = React.createRef();
    let magicInputRef = React.createRef();
    let afterIconDiv = React.createRef();

    return <Box sx={{ minWidth: 0 }}>

        {!task.mId1 ?
            // <IconButton variant="contained" color="success" sx={{ minWidth: 0 }}
            //     onClick={() => onIncrementClick({ task, tasks, setTasks })}
            // >
            <Fab size='small' >
                <PlusOneIcon
                    fontSize='small'
                    onClick={() => onIncrementClick({ task, tasks, setTasks })}
                />
            </Fab>

            // </IconButton>

            :

            <>
                <AutoFixHighIcon sx={{ height: 1, opacity: menuOpen ? 0 : 0 }} ref={afterIconDiv} />

                <Popper id="basic-menu"
                    placement="left"
                    open={true}
                    anchorEl={(e) => { console.log(e);return afterIconDiv.current; }}
                // MenuListProps={{
                //     'aria-labelledby': 'basic-button'
                // }}>
                >
                    <Stack
                        onMouseDown={(e) => { sliderOnChange(0); }}
                        sx={{
                            width: menuOpen ? 200 : 40,
                            scale: menuOpen ? 2 : 2,
                            marginLeft: menuOpen ? 9 : 0
                        }}>
                        <Slider
                            onChange={(e) => { sliderOnChange(e); }}
                            onChangeComplete={(e) => { sliderOnComplete(e); }}
                            onFocusVisible={true}
                            tooltip={{ open: menuOpen }}
                            reverse={false}
                            min={0}
                            max={menuOpen ? sMax : 10}
                            size="large"
                            defaultValue={0}
                            value={sVal}
                            //aria-label="Small"
                            valueLabelDisplay="auto"
                        />
                    </Stack>
                </Popper>
            </>
        }

        {/* {task.mId1 ?
            <Input inputRef={magicInputRef} name='name' defaultValue={10} sx={{ minWidth: 0, width: 30 }} /> : ''
        } */}
        {/* {task.mId1
            ?
            <Button variant="contained" color="success" sx={{ minWidth: 0 }}
                onClick={() => onNumberCommit({ task, tasks, setTasks })}
            >
                <AutoFixHighIcon fontSize='small'></AutoFixHighIcon>

            </Button> : ''} */}

    </Box>
}

export default TaskMenu2;