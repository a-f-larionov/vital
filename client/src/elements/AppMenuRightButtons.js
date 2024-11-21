import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Box, Button } from "@mui/material";
import React from "react";
import PageManager from '../managers/PageManager';

function AppMenuRightButton({ tasks, setTasks, collapsAll, setCollapsAll }) {

    switch (PageManager.currentPage) {
        case PageManager.PAGE_MAIN:
            return <>
                <Box display="flex" justifyContent="center">
                    <Button sx={{ minWidth: 0, width: 40 }} variant="contained"
                        onClick={() => {
                            PageManager.collapsAll(tasks, setTasks, !collapsAll)
                            setCollapsAll(!collapsAll);
                        }}>
                        {collapsAll ? <UnfoldMoreIcon hide="false" /> : <UnfoldLessIcon />}
                    </Button>
                </Box >

                <Box display="flex" justifyContent="center">
                    <Button sx={{ minWidth: 0, width: 40 }} variant="contained" onClick={() => { PageManager.setPage(PageManager.PAGE_CALENDAR) }}>
                        <CalendarMonthIcon />
                    </Button>
                </Box >

            </>
        case PageManager.PAGE_EDIT_TIKS:
            return <></>;
        case PageManager.PAGE_CALENDAR:
            return <></>;
        default:
            return <></>
    }
}

export default AppMenuRightButton;