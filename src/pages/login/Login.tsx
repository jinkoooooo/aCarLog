import * as React from 'react';
import GoogleLogin from 'react-google-login';
import {AuthAPI} from "../../api/AuthAPI";
import {User} from "../../model/User";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers";
import {setTheme} from "../../redux/actions/themeActions";
import {THEMES} from "../../constants";
import {setCurrentUserInfo, UserAuth, userLogout} from "../../redux/reducers/authStore";
import {Grid, Paper} from "@material-ui/core";
import {ColDef, DataGrid} from "@material-ui/data-grid";

const Login = () => {
    const {UserLogin} = AuthAPI();

    const dispatcher = useDispatch();

    //클라이언트 ID (환경변수)
    let googleClientId:string=process.env.REACT_APP_CLIENT_ID||"";
    //사용자 정보를 담아둘 userObj
    const [userObjState, setUserObjState]=React.useState(new User())
    //로그인 성공시 res처리
    const onLoginSuccess=(res:any)=>{


        console.log(res);

        let userObj:User = new User();
        userObj.apiClientId = googleClientId;
        userObj.apiClientToken = res.accessToken;
        userObj.userName = res.profileObj.name;
        userObj.email = res.profileObj.email;
        userObj.imageUrl = res.profileObj.imageUrl;

        setUserObjState(userObj);
        console.log(userObj);
        UserLogin(userObj)
            .then(res => {
                const menus = res.data.get(0) as UserAuth;
                // 사용자 정보 패치
                dispatcher(
                    setCurrentUserInfo({
                        accessToken: menus.accessToken,
                        refreshToken: menus.refreshToken,
                        isAuth: true,
                        user: userObj,
                    })
                );
                console.log(res);
            })
            .catch(err => {
                /*dispatcher(
                    userLogout()
                );*/
                dispatcher(
                    setCurrentUserInfo({
                        accessToken: "test",
                        refreshToken: "test",
                        isAuth: true,
                        user: userObj,
                    })
                );
                console.log(err);
            });
    }


    return (
        <div>
            <GoogleLogin
                clientId = {googleClientId}
                buttonText="Google"
                onSuccess={result=>onLoginSuccess(result)}
                onFailure={result => console.log(result)}
            />
            {/*<Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={6} lg={3} xl>
                    사용자 로그인 정보
                </Grid>
            </Grid>
            <Paper>
                <div>
                    <label>User Email : {userObjState.email}</label>
                </div>
                <div>
                    <label>User Name : {userObjState.userName}</label>
                </div>
                <div>
                    <label>User ClientId : {userObjState.apiClientId}</label>
                </div>
                <div>
                    <label>User ClientToken : {userObjState.apiClientToken}</label>
                </div>
            </Paper>*/}

        </div>
    );
};

export default Login;