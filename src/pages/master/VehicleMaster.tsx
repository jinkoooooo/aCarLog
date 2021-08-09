import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import imgCar_1 from "../../../public/mcb2.jpg"

import {
    Grid,
    Divider as MuiDivider,
    Typography as MuiTypography, Paper as MuiPaper, Button as MuiButton,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {CustomCard} from "../../components/CustomCard";
import {VehicleAPI} from "../../api/VehicleAPI";
import {CellParams, ColDef, DataGrid} from "@material-ui/data-grid";
import {DrivingLog, VehicleData} from "../../model/Vehicle";
import {Edit2, Trash2} from "react-feather";
import {setCurrentPageState} from "../../redux/reducers/pageStore";
import {useDispatch} from "react-redux";


const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);
const Typography = styled(MuiTypography)(spacing);

function VehicleMaster() {
    const [vehiclesList, setVehiclesList] = useState<VehicleData[]>([]);

    const dispatcher = useDispatch();
    const {GetVehiclesList} = VehicleAPI();

    useEffect(() => {
        // loading 플레그 변경
        dispatcher(setCurrentPageState({isLoading: true}));

        GetVehiclesList().then(res => {
            console.log(res.data)
            setVehiclesList(res.data as VehicleData[]);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            // loading 플레그 변경
            dispatcher(setCurrentPageState({isLoading: false}));
        });
    }, []);



    /**------------------------------------------
     *  Data grid column 선언
     *-------------------------------------------*/
    const columns: ColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            headerAlign: "center",
            align: "center",
            sortable: false,

        },
        {
            field: "model",
            headerName: "Model",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "modelYear",
            headerName: "연식",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "name",
            headerName: "이름",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "odometer",
            headerName: "주행거리",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "vehicleNumber",
            headerName: "차량번호",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "odometer",
            headerName: "운행 거리",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "modifyAction",
            headerName: "수정",
            width: 100,
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (params: CellParams) => {
                /*let opCode: string = String(params.getValue("opCode"));
                let opType: string = String(params.getValue("opType"));
                let opName: string = String(params.getValue("opName"));

                const paramObject = new OperationGroup();
                paramObject.opCode = opCode;
                paramObject.opType = opType;
                paramObject.opName = opName;*/

                return (
                    <Grid container justify="center">
                        <a ><Edit2 style={{cursor: 'pointer'}}/></a>
                    </Grid>
                )
            }
        },
        {
            field: "deleteAction",
            headerName: "삭제",
            width: 100,
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (params: CellParams) => {


                return (
                    <Grid container justify="center">
                        <a><Trash2 style={{cursor: 'pointer'}}/></a>
                    </Grid>
                )
            }
        }
    ];

    return (
        <React.Fragment>
            <Grid justify="space-between" container spacing={6}>
                <Grid item>
                    <Typography variant="h3" gutterBottom>
                        CarMaster
                    </Typography>
                </Grid>

            </Grid>

            <Divider my={6}/>

            <Paper>
                <div style={{height: 500, width: '100%' }}>
                    <DataGrid
                        showToolbar
                        columns={columns}
                        rows={vehiclesList}
                    />
                </div>
            </Paper>
        </React.Fragment>
    );
}

export default VehicleMaster;
