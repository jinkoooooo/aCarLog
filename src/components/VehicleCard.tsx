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
    const [imgURL, setImgUrl] = useState("/mcb2.jpg");

    const [logDialogFlag, setLogDialogFlag] = useState(false);
    const [logInsertFlag, setLogInsertFlag] = useState(false);


    useEffect(()=>{
        if(props.vehicleData.imageUrl != undefined){
            setImgUrl(props.vehicleData.imageUrl);
        }
    },[])



    return(
        <Card >
            <CardActionArea>
                <CardMedia
                    image={imgURL}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.vehicleData.name?props.vehicleData.name:"Empty Product"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {<>Model : {props.vehicleData.model}
                            <br/>
                            주행거리 : {props.vehicleData.odometer} km
                            <br/>
                            연식 : {props.vehicleData.modelYear} 년식
                            <br/>
                            차량번호 : {props.vehicleData.vehicleNumber} 년식</>}

                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick = {() => {setLogDialogFlag(!logDialogFlag)}}>
                    기록조회
                </Button>
                <Button size="small" color="primary" onClick = {() => {setLogInsertFlag(!logInsertFlag)}}>
                    기록등록
                </Button>
            </CardActions>
            <DrivingLogModal
                title="차량 기록 일지"
                vehicleData={props.vehicleData}
                onClose={() => setLogDialogFlag(false)}
                open={logDialogFlag}
            />
            <DrivingLogInsertModal
                title="운행 기록 등록"
                vehicleData={props.vehicleData}
                onClose={() => setLogInsertFlag(false)}
                open={logInsertFlag}
            />
        </Card>
    )
};
