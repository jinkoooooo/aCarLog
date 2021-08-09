import {dataApi} from './IApi';
import {AuthData} from "../model/User";
import {useTypedSelector} from "../redux/reducers";

export function VehicleAPI() {
    const _toKen = useTypedSelector(state => state.userAuth).user?.acessToken

    const _api = dataApi(_toKen);

    return {
        /**
         * 로그인
         * @params 사용자 로그인 정보.
         * @param params
         */
        test : function(params:AuthData){

            return _api.post('/vehicles',
                JSON.stringify({
                    apiClientId:params.apiClientId,
                    apiClientToken :params.apiClientToken
                })
            );
        },

        GetVehiclesList : function(){

            return _api.get('/vehicles');
        }

    }

}