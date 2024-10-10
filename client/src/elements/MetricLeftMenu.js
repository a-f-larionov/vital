import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Box, Fab, Stack } from "@mui/material";
import Popper from "@mui/material/Popper";
import { Slider } from 'antd';
import React from "react";
import TaskManager from "../managers/TaskManager";

function MetricLeftMenu({ task, tasks, setTasks }) {

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [sVal, setSVal] = React.useState(0);

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

    function onIncrementClick({ task, tasks, setTasks }) {
        TaskManager.increment(task, tasks, setTasks);
    }

    let afterIconDiv = React.createRef();


    return <Box sx={{ minWidth: 0 }}>

        {!task.mId1 ?

            <Fab size='small' >
                <PlusOneIcon
                    fontSize='small'
                    onClick={() => onIncrementClick({ task, tasks, setTasks })}
                />
            </Fab>

            :

            <>
                <AutoFixHighIcon sx={{ height: 1, opacity: 0 }}
                    ref={afterIconDiv} />

                <Popper
                    placement="left"
                    open={true}
                    anchorEl={() => {
                        if (afterIconDiv.current) return afterIconDiv.current;
                        return document.getElementById('root');
                    }}
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
                            max={menuOpen ? 60 : 10}
                            size="large"
                            defaultValue={0}
                            value={sVal}
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

export default MetricLeftMenu;