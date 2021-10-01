import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {
    Button as MuiButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper as MuiPaper,
    Dialog,
    Avatar as MuiAvatar,
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Chip as MuiChip,
    Divider as MuiDivider,
    Grid as MuiGrid,
    LinearProgress as MuiLinearProgress,
    Typography as MuiTypography,
} from "@material-ui/core";

import styled from "styled-components/macro";
import {spacing, SpacingProps} from "@material-ui/system";
import {DrivingLog, VehicleData} from "../../../model/Vehicle";
import {AuthAPI} from "../../../api/AuthAPI";
import {UserData} from "../../../model/User";

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);


const Spacer = styled.div(spacing);

interface TypographyPropsType extends SpacingProps {
    component?: string;
}
const Typography = styled(MuiTypography)<TypographyPropsType>(spacing);

const Centered = styled.div`
  text-align: center;
`;

const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 128px;
  width: 128px;
`;


type VehicleManagerModal = {
    title: string,
    vehicleData: VehicleData,
    onClose: () => void
    open: boolean
};


export function VehicleManagerModal(props: VehicleManagerModal) {
    const [managerData, setManagerData] = useState<UserData>();
    const {GetSelectUserData} = AuthAPI();

    useEffect(() => {
        if(props.vehicleData.managerId != null){
            GetSelectUserData(props.vehicleData.managerId).then(res => {
                setManagerData(res.data as UserData);
                console.log(res);
            }).catch(err => {
                console.log(err.message);
            })
        }
    }, []);


    const close = () => {
        if (props.onClose)
            props.onClose();
    }

    return (
        <>
            <Dialog open={props.open}>
                <DialogTitle>
                    <Typography gutterBottom>{props.title}</Typography>
                </DialogTitle>

                <DialogContent>

                    <Card mb={6}>
                        <CardContent>
                            <Spacer mb={4} />

                            <Centered>
                                <Avatar alt="Lucy Lavender" src="/noProfileImg.JPG" />
                                {managerData != undefined ?
                                    (<Typography variant="body2" gutterBottom>
                                        <Box fontWeight="fontWeightMedium">{managerData.username}</Box>
                                        <Box fontWeight="fontWeightRegular">{managerData.email}</Box>
                                    </Typography>)
                                :(<Typography variant="body2" gutterBottom>
                                        <Box fontWeight="fontWeightMedium">담당자 없음</Box>
                                    </Typography>)}

                            </Centered>
                        </CardContent>
                    </Card>
                </DialogContent>

                <DialogActions>
                    <Button onClick={close} color="primary">확인</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}