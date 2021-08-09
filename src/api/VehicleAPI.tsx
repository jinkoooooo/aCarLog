import {dataApi} from './IApi';
import {AuthData} from "../model/User";
import {useTypedSelector} from "../redux/reducers";
import {DrivingLog, VehicleData} from "../model/Vehicle";

export function VehicleAPI() {
    const userAuth = useTypedSelector(state => state.userAuth);
    const _api = dataApi(userAuth.user?.acessToken);

    return {
        /**
         * 차량 운행이력 등록
         */
        PostDrivingLogInsert: function (DrivingLog: DrivingLog) {

            return _api.post('/vehicles/' + DrivingLog.vehicleId+'/driving-logs',
                JSON.stringify({
                    driverId: 11,
                    startDateTime: new Date(DrivingLog.startDateTime).toISOString(),
                    arriveDateTime: new Date(DrivingLog.arriveDateTime).toISOString(),
                    startOdometer: DrivingLog.startOdometer,
                    arriveOdometer: DrivingLog.arriveOdometer
                })
            );
        },

        // 차량정보 목록 조회
        GetVehiclesList: function () {

            return _api.get('/vehicles');
        },

        // 특정차량 운행이련 조회
        GetVehiclesDriveLog: function (vehicleData: VehicleData) {

            return _api.get('/vehicles/' + vehicleData.id+'/driving-logs');
        },

        // 특정차량정보 조회
        GetVehicle: function (vehicleData: VehicleData) {

            return _api.get('/vehicles/' + vehicleData.id);
        }

    }

}