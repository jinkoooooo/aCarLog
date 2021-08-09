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

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
  background-image: url("/images/mcb2.jpg");
`;


type CardProps = {
    cardName?:string;
    vehicleData:VehicleData;
    imgUrl?:string;
    context?:any;
    OnClickLearnMore?: () => void
    OnClickRun?:string; // 임시 로 string
}

export const CustomCard = (props:CardProps) => {
    const [imgURL, setImgUrl] = useState("/mcb2.jpg");
    const [driveLog, setDriveLog] = useState([]);

    const {GetVehiclesDriveLog} = VehicleAPI();

    useEffect(()=>{
        if(props.imgUrl != undefined){
            setImgUrl(props.imgUrl);
        }
    },[])

    const ClickBtnDrivingLog = () => {
        GetVehiclesDriveLog(props.vehicleData).then(res => {
            console.log(res);

            setDriveLog(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        <Card >
            <CardActionArea>
                <CardMedia
                    image={imgURL}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.cardName?props.cardName:"Empty Product"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.context?props.context:
                            (<>
                                비어있는 항목 입니다.
                                <br />
                                새로운 제품이 추가될 예정입니다.
                                <br />
                                조금만 기다려 주세요.
                            </>)}

                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick = {ClickBtnDrivingLog}>
                    운행기록보기
                </Button>
            </CardActions>
        </Card>
    )
};
/*

const useStyles = makeStyles((theme: Theme) => {

    const drawerWidth = 240;

    return createStyles({

        /!**
         * Home
         *!/
        homeGridRoot: {
            flexGrow: 1,
        },
        homePaper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            maxWidth: 340,
            color: theme.palette.text.secondary,
        },
        homeRoot: {
            maxWidth: 340,
        },
        homeMedia: {
            height: 140,
        },
        homeMainImg: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            overflow: 'hidden',
            background: 'url(/images/main/m_vsl1.jpg)',
            width: '100%',
            height: 'calc(100vh - 100px)'
        },


    });
});*/
