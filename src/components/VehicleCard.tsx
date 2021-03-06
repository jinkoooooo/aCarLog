import {Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Helmet } from "react-helmet";

import {
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    Link,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    CardMedia as MuiCardMedia,
    Divider as MuiDivider,
    Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import {VehicleData} from "../model/Vehicle";
import {VehicleAPI} from "../api/VehicleAPI";
import {DrivingLogModal} from "../pages/vehicle/modal/DrivingLogModal";
import {DrivingLogInsertModal} from "../pages/vehicle/modal/DrivingLogInsertModal";
import {VehicleManagerModal} from "../pages/vehicle/modal/VehicleManagerModal";

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
  background-image: url("/images/mcb2.jpg");
`;


type CardProps = {
    vehicleData:VehicleData;
}

export const VehicleCard = (props:CardProps) => {
    const [imgURL, setImgUrl] = useState("/vanzS.JPG");
    const {GetVehicle} = VehicleAPI();
    const [logDialogFlag, setLogDialogFlag] = useState(false);
    const [logInsertFlag, setLogInsertFlag] = useState(false);
    const [vehicleDetailFlag, setVehicleDetailFlag] = useState(false);

    const [bindingVehicleData, setBindingVehicleData] = useState<VehicleData>(new VehicleData());


    useEffect(()=>{
        setBindingVehicleData(props.vehicleData);

        if(props.vehicleData.imageUrl != null){
            setImgUrl(props.vehicleData.imageUrl);
        }
    },[])

    const insertClose = () => {

        GetVehicle(props.vehicleData).then(res => {
            let reBindingData = res.data as VehicleData;
            setBindingVehicleData(reBindingData);
        }).catch(err => {
            console.log(err);
        })
    }


    return(
        <Card>
            <CardActionArea>
                <CardMedia
                    image={imgURL}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {bindingVehicleData.name?bindingVehicleData.name:"Empty Product"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Grid container item xs={12} spacing={2} justify="flex-start">

                            <Grid item xs={5} sm={5}>
                                <label>Model</label>
                            </Grid>
                            <Grid item xs={7} sm={7}>
                                <label>{bindingVehicleData.model}</label>
                            </Grid>

                            <Grid item xs={5} sm={5}>
                                <label>????????????</label>
                            </Grid>
                            <Grid item xs={7} sm={7}>
                                <label>{bindingVehicleData.odometer} km</label>
                            </Grid>

                            <Grid item xs={5} sm={5}>
                                <label>??????</label>
                            </Grid>
                            <Grid item xs={7} sm={7}>
                                <label>{bindingVehicleData.modelYear} ??????</label>
                            </Grid>

                            <Grid item xs={5} sm={5}>
                                <label>????????????</label>
                            </Grid>
                            <Grid item xs={7} sm={7}>
                                <label>{bindingVehicleData.vehicleNumber}</label>
                            </Grid>
                        </Grid>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container item xs={12} spacing={2} justify="center">

                    <Grid item xs={4} sm={4}>
                        <Button size="small" color="primary" onClick = {() => {setLogDialogFlag(!logDialogFlag)}}>
                            ??????????????????
                        </Button>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Button size="small" color="primary" onClick = {() => {setLogInsertFlag(!logInsertFlag)}}>
                            ??????????????????
                        </Button>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Button size="small" color="primary" onClick = {() => {setVehicleDetailFlag(!vehicleDetailFlag)}}>
                            ???????????????
                        </Button>
                    </Grid>
                </Grid>

            </CardActions>
            <DrivingLogModal
                title="?????? ?????? ??????"
                vehicleData={bindingVehicleData}
                onClose={() => setLogDialogFlag(false)}
                open={logDialogFlag}
            />
            <DrivingLogInsertModal
                title="?????? ?????? ??????"
                vehicleData={bindingVehicleData}
                onSubmit={insertClose}
                onClose={() => setLogInsertFlag(false)}
                open={logInsertFlag}
            />
            <VehicleManagerModal
                title="????????? ??????"
                vehicleData={bindingVehicleData}
                onClose={() => setVehicleDetailFlag(false)}
                open={vehicleDetailFlag}
            />
        </Card>
    )
};
