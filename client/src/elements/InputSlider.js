import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Popper, Stack } from "@mui/material";
import { Slider } from 'antd';
import React from 'react';
import TaskManager from '../managers/TaskManager';

function InputSlider({ metrica, task, tasks, setTasks }) {
    let m = metrica;
    
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

    let afterIconDiv = React.createRef();

    return <>
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
    </>;
}

export default InputSlider; 