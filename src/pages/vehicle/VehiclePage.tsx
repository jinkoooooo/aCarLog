import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";

import {
    Grid,
    Divider as MuiDivider,
    Typography as MuiTypography, Paper,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {CustomCard} from "../../components/CustomCard";
import {VehicleAPI} from "../../api/VehicleAPI";
import {VehicleData} from "../../model/Vehicle";


const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function VehiclePage() {

    const {GetVehiclesList} = VehicleAPI();

    const [vehicleList, setVehicleList] = React.useState<VehicleData[]>([])

    useEffect(() => {

        GetVehiclesList().then(res => {
            console.log(res.data);
            setVehicleList(res.data as VehicleData[]);
        }).catch(err => {
            console.log(err);
        })

    }, []);


    const bindingVehicleList = (vehicleList: VehicleData[]) => {


    }

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

            <Grid container spacing={6}>
                {vehicleList.map((value, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={12} md={6} lg={3} xl>
                            <Paper>
                                <CustomCard
                                    cardName={value.name}
                                    context={<>Model : {value.model}
                                        <br/>
                                        주행거리 : {value.odometer} km
                                        <br/>
                                        연식 : {value.modelYear} 년식
                                        <br/>
                                        차량번호 : {value.vehicleNumber} 년식</>}
                                    imgUrl={value.imageUrl == null ? "/avante.JPG" : value.imageUrl}
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
