import { FormControl, Grid2, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function MetricElement({ mId, vCode, elIndex, metrica, views }) {

    const [mIdState, setMIdState] = React.useState(mId ? mId : "");
    const handleTypeChange = (event) => {
        setMIdState(event.target.value);
    };

    const [vCodeState, setView] = React.useState(vCode ? vCode : "");
    const handleViewChange = (event) => {
        setView(event.target.value);
    };

    return (
        <Grid2 size={12} container>

            <Grid2 size={3} >Метрика {elIndex}:</Grid2>
            <Grid2 size={4}>
                <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-label-type">Тип</InputLabel>
                    <Select
                        labelId="select-label-type"
                        id="select-label-type"
                        value={mIdState}
                        label="Тип"
                        name={"typeId" + elIndex}
                        onChange={handleTypeChange}>
                        {metrica.map((m) => {
                            return (
                                <MenuItem key={m.id} value={m.id}>
                                    {m.shortTitle}
                                    &nbsp;
                                    {m.title}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid2>

            <Grid2 size={4}>
                <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-label-view">Вид</InputLabel>
                    <Select
                        labelId="select-label-view"
                        id="select-label-view"
                        value={vCodeState}
                        label="Вид"
                        name={"viewCode" + elIndex}
                        onChange={handleViewChange}   >
                        {views.map((m) => {
                            return (
                                <MenuItem key={m.code} value={m.code}>
                                    {m.shortTitle}
                                    &nbsp;
                                    {m.title}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid2>

        </Grid2 >
    )
}


export default MetricElement;
