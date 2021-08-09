import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";

import {
    Grid,
    Divider as MuiDivider,
    Typography as MuiTypography, Paper,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {VehicleCard} from "../../components/VehicleCard";
import {VehicleAPI} from "../../api/VehicleAPI";
import {VehicleData} from "../../model/Vehicle";
import {useDispatch} from "react-redux";
import {setCurrentPageState} from "../../redux/reducers/pageStore";


const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function VehiclePage() {

    const {GetVehiclesList} = VehicleAPI();

    const [vehicleList, setVehicleList] = React.useState<VehicleData[]>([]);

    const dispatcher = useDispatch();

    useEffect(() => {
        // loading 플레그 변경
        dispatcher(setCurrentPageState({isLoading: true}));

        GetVehiclesList().then(res => {
            console.log(res.data);
            setVehicleList(res.data as VehicleData[]);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            // loading 플레그 변경
            dispatcher(setCurrentPageState({isLoading: false}));
        });

    }, []);



    return (
        <React.Fragment>
            <Grid justify="space-between" container spacing={6}>
                <Grid item>
                    <Typography variant="h3" gutterBottom>
                        VehiclePage
                    </Typography>
                </Grid>

            </Grid>

            <Divider my={6}/>

            <Grid container spacing={3}>
                {vehicleList.map((value, index) => {
                    return (
                        <Grid key={index} item xs={4}>
                            <Paper>
                                <VehicleCard
                                    vehicleData={value}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </React.Fragment>
    );
}

export default VehiclePage;
