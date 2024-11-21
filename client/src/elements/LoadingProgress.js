import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";

function LoadingProgress() {
    return <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 1, height: "100vh" }}>
        <CircularProgress />
    </Stack>
}

export default LoadingProgress;