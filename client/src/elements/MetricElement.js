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
        <>
            <Grid2 size={3} alignContent={'center'}>
                Метрика #{elIndex}:
            </Grid2>
            <Grid2 size={4}>
                <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel >Тип</InputLabel>
                    <Select
                        required={elIndex == 1}
                        value={mIdState}
                        label="Типы"
                        name={"typeId" + elIndex}
                        onChange={handleTypeChange}>
                        <MenuItem key="" value="">Без типа</MenuItem>
                        {metrica.map((m) => {
                            return (
                                <MenuItem key={m.id} value={m.id}>
                                    {m.icon}
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
                    <InputLabel >Вид</InputLabel>
                    <Select
                        required={elIndex == 1}
                        value={vCodeState}
                        label="Вид"
                        name={"viewCode" + elIndex}
                        onChange={handleViewChange}   >
                        <MenuItem key="" value="">Без отображения</MenuItem>
                        {views.map((m) => {
                            return (
                                <MenuItem key={m.code} value={m.code}>
                                    {m.icon}
                                    &nbsp;
                                    {m.title}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid2>

        </>
    )
}


export default MetricElement;
