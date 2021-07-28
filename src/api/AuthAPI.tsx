import authApi from './IApi';
import {AxiosRequestConfig} from "axios";
import {User} from "../model/User";

export function AuthAPI() {

    const _api = authApi();

    return {
        /**
         * 로그인
         * @params 사용자 로그인 정보.
         * @param params
         */
        UserLogin : function(params:User){

            return _api.post('/auth/login',
                    {
                        apiClientId:params.apiClientId,
                        apiClientToken:params.apiClientToken,
                        userName:params.userName,
                        email:params.email,
                        imageUrl:params.imageUrl
                    }
                );
        }

    }

}