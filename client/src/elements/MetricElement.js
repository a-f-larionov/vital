import { FormControl, Grid2, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function MetricElement({ metric, elIndex, metricTemplates, views }) {

    const [mIdState, setMIdState] = React.useState(metric ? metric.templateId : "");
    const handleTypeChange = (event) => {
        setMIdState(event.target.value);
    };

    const [viewCodeState, setViewCode] = React.useState(metric ? metric.viewCode : "");
    const handleViewChange = (event) => {
        setViewCode(event.target.value);
    };

    return (
        <>
            <Grid2 size={1} alignContent={'center'}>
                #{elIndex + 1}:
            </Grid2>
            <Grid2 size={5}>
                <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel >Шаблон</InputLabel>
                    <Select
                        required={elIndex === 1}
                        value={mIdState}
                        label="Типы"
                        name={"templateId_" + elIndex}
                        onChange={handleTypeChange}>
                        <MenuItem key="" value="">Без типа</MenuItem>
                        {metricTemplates.map((m) => {
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

            <Grid2 size={5}>
                <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel >Вид</InputLabel>
                    <Select
                        required={elIndex === 1}
                        value={viewCodeState}
                        label="Вид"
                        name={"viewCode_" + elIndex}
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
