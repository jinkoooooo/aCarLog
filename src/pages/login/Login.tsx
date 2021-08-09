import * as React from 'react';
import GoogleLogin from 'react-google-login';
import {AuthAPI} from "../../api/AuthAPI";
import {AuthData, UserData} from "../../model/User";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers";
import {setTheme} from "../../redux/actions/themeActions";
import {THEMES} from "../../constants";
import {setCurrentUserInfo, UserAuth, userLogout} from "../../redux/reducers/authStore";
import {Grid, Paper} from "@material-ui/core";
import {ColDef, DataGrid} from "@material-ui/data-grid";
import {useState} from "react";
import {LoadingProgressBar} from "../../components/ProgressBar";
import {setCurrentPageState} from "../../redux/reducers/pageStore";

const Login = () => {
    const {UserLogin, GetUserData} = AuthAPI();
    const dispatcher = useDispatch();

    //클라이언트 ID (환경변수)
    let googleClientId:string=process.env.REACT_APP_CLIENT_ID||"";
    //사용자 정보를 담아둘 userObj
    const [userObjState, setUserObjState]=React.useState(new AuthData())
    //로그인 성공시 res처리
    const onLoginSuccess=(res:any)=>{
        // loading 플레그 변경
        dispatcher(setCurrentPageState({isLoading: true}));

        console.log(res);

        let userObj:AuthData = new AuthData();
        userObj.apiClientId = googleClientId;
        userObj.apiClientToken = res.tokenId;

        setUserObjState(userObj);
        console.log("구글 로그인 성공"+userObj);

        UserLogin(userObj)
            .then(res => {
                userObj.acessToken = res.data.accessToken;
                console.log("로그인 성공"+res.data.accessToken);
                GetUserData(userObj.acessToken).then(res => {

                    console.log("GetUserData ");
                    console.log(res.data);

                    userObj.userData = res.data as UserData;

                    console.log(userObj);

                    // 사용자 정보 패치
                    dispatcher(
                        setCurrentUserInfo({
                            isAuth: true,
                            user: userObj,
                        })
                    );
                })

            })
            .catch(err => {

                dispatcher(
                    userLogout()
                );
                console.log("로그인 실패"+err);
            }).finally(() => {
            // loading 플레그 변경
            dispatcher(setCurrentPageState({isLoading: false}));
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
        </div>
    );
};

export default Login;