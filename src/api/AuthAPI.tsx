import authApi, {dataApi} from './IApi';
import {AxiosRequestConfig} from "axios";
import {AuthData} from "../model/User";
import {useTypedSelector} from "../redux/reducers";
import {VehicleData} from "../model/Vehicle";

export function AuthAPI() {
    const userAuth = useTypedSelector(state => state.userAuth);
    const _api = authApi();
    const _dataApi = dataApi(userAuth.user?.acessToken);

    return {
        /**
         * 로그인
         * @params 사용자 로그인 정보.
         * @param params
         */
        UserLogin : function(params:AuthData){

            return _api.post('/auth/login',
                JSON.stringify({
                        apiClientId:params.apiClientId,
                        apiClientToken :params.apiClientToken
                    })
                );
        },

        GetUserData : function(accessToken:string){

            return _api.get('/auth/me', {
                'headers':{
                    'X-AUTH-TOKEN': accessToken
                }
            });
        },

        // 특정차량 운행이련 조회
        GetSelectUserData: function (userId: number) {

            return _api.get('/users/' + userId);
        },

    }

}