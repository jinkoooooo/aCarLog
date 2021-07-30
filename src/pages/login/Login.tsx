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
    const {UserLogin, GetUserData} = AuthAPI();

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
        userObj.apiClientToken = res.tokenId;
        userObj.userName = res.profileObj.name;
        userObj.email = res.profileObj.email;
        userObj.imageUrl = res.profileObj.imageUrl;

        setUserObjState(userObj);
        console.log("구글 로그인 성공"+userObj);

        /*const host = 'https://app-msa-gateway.herokuapp.com'

        let token = {
            apiClientId : userObj.apiClientId,
            apiClientToken : userObj.apiClientToken
        }

        const loginReq = fetch(`${host}/auth/login`, {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(token)
        })
            .then(res => res.json())

        console.log(loginReq)*/

        UserLogin(userObj)
            .then(res => {

                console.log("로그인 성공"+res.data.accessToken);
                GetUserData(res.data.accessToken).then(res => {
                    console.log("GetUserData ");
                    console.log(res.data);

                    // 사용자 정보 패치
                    dispatcher(
                        setCurrentUserInfo({
                            accessToken: res.data.accessToken,
                            refreshToken: "",
                            isAuth: true,
                            user: userObj,
                        })
                    );
                })

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
                console.log("로그인 실패"+err);
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