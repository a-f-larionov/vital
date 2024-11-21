import { Grid2 } from '@mui/material';
import Stack from "@mui/material/Stack";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import UserManager from '../managers/UserManager';

function AuthForm({ setUserProfile }) {

    let googleOk = function (d) {
        let decoded = jwtDecode(d.credential)
        UserManager.register(decoded.email, decoded.picture, setUserProfile);
    }

    return <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 1, height: "100vh" }}>
        <Grid2 container>
            <Grid2 size={4}></Grid2>
            <Grid2 size={1} sx={{ alignContent: 'center' }}>
                <GoogleLogin type="icon" onSuccess={googleOk} onError={console.log} />
            </Grid2>
            <Grid2 size={12} sx={{ marginBottom: 5, marginTop: 5 }}>
                Авторизутесь пжлст!
            </Grid2>
        </Grid2>
    </Stack>
}

export default AuthForm;