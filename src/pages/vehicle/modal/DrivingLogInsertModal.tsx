import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {
    Button as MuiButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider as MuiDivider,
    Paper as MuiPaper,
    TextField,
    Grid,
    Typography,
    NativeSelect, Dialog
} from "@material-ui/core";
import {useForm} from "react-hook-form";

import styled from "styled-components/macro";
import {spacing} from "@material-ui/system";
import {makeStyles} from "@material-ui/core/styles";
import {TransactionSnackbar, TransactionSnackbarPropType} from "../../../components/snackbar/TransactionSnackbar";
import {DrivingLog, VehicleData} from "../../../model/Vehicle";
import {VehicleAPI} from "../../../api/VehicleAPI";
import {setCurrentPageState} from "../../../redux/reducers/pageStore";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    searchWidth: {
        width: "200px"
    }
}));

type DrivingLogInsertModal = {
    title: string,
    vehicleData: VehicleData,
    onSubmit: () => void
    onClose: () => void
    open: boolean
};

const Button = styled(MuiButton)(spacing);
const Paper = styled(MuiPaper)(spacing);

export function DrivingLogInsertModal(props: DrivingLogInsertModal) {
    //snackbar
    const [snackbarState, setSnackbarState] = useState<TransactionSnackbarPropType>({
        open: false,
        message: "",
        type: "success",
        duration: 3000
    });

    const [errorSnackbarState, setErrorSnackbarState] = useState<TransactionSnackbarPropType>({
        open: false,
        message: "",
        type: "error",
        duration: null
    });

    const snackBarClose = useCallback(() => {
        setSnackbarState({...snackbarState, open: false})
    }, [snackbarState])

    const errorSnackBarClose = useCallback(() => {
        setErrorSnackbarState({...errorSnackbarState, open: false})
    }, [errorSnackbarState])

    const dispatcher = useDispatch();


    const {register, reset, watch, errors, setValue, setError, clearError, handleSubmit} = useForm();
    const onSubmit = handleSubmit(({startDateTime, arriveDateTime, startOdometer, arriveOdometer}) => {
        let params: DrivingLog = new DrivingLog();
        params.vehicleId = props.vehicleData.id;
        params.startDateTime = startDateTime;
        params.arriveDateTime = arriveDateTime;
        params.startOdometer = props.vehicleData.odometer;
        params.arriveOdometer = props.vehicleData.odometer + parseInt(arriveOdometer);

        dispatcher(setCurrentPageState({isLoading: true}));

        confirm(params);
        close();
    });

    useEffect(() => {

    }, []);

    const {PostDrivingLogInsert} = VehicleAPI();

    const confirm = (drivingLogPost: DrivingLog) => {
        PostDrivingLogInsert(drivingLogPost)
            .then(res => {
                if (props.onSubmit)
                    props.onSubmit();

                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "?????????????????????.",
                });
            })
            .catch(err => {
                setErrorSnackbarState({
                    ...errorSnackbarState,
                    open: true,
                    message: `????????? ????????? ?????????????????????. ${err}`,
                })
            }).finally(() => {
            dispatcher(setCurrentPageState({isLoading: false}));

        });
    }

    const close = () => {
        if (props.onClose)
            props.onClose();
    }

    const classes = useStyles();

    return (
        <>
            <TransactionSnackbar
                {...snackbarState}
                handleClose={snackBarClose}
            />

            <Dialog open={props.open}>
                <TransactionSnackbar
                    {...errorSnackbarState}
                    handleClose={errorSnackBarClose}
                />

                <form onSubmit={onSubmit}>
                    <DialogTitle>
                        <Typography gutterBottom>{props.title}</Typography>
                    </DialogTitle>

                    <DialogContent>

                        <Grid container item xs={12} spacing={1} justify="flex-start">

                            <Grid item xs={4} sm={4}>
                                <label>?????? ?????? ??????</label>
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <TextField
                                    id="startDateTime"
                                    name="startDateTime"
                                    label="Next appointment"
                                    type="datetime-local"
                                    inputRef={register}
                                    required={true}
                                    defaultValue={new Date().toISOString().substring(0, 16)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4} sm={4}>
                                <label>?????? ?????? ??????</label>
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <TextField
                                    id="arriveDateTime"
                                    name="arriveDateTime"
                                    label="Next appointment"
                                    type="datetime-local"
                                    inputRef={register}
                                    required={true}
                                    defaultValue={new Date().toISOString().substring(0, 16)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4} sm={4}>
                                <label>?????? ?????? ??????</label>
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <TextField
                                    id="startOdometer"
                                    name="startOdometer"
                                    variant="outlined"
                                    inputRef={register}
                                    required={true}
                                    defaultValue={props.vehicleData.odometer}
                                    size="small"
                                    className={classes.searchWidth}
                                />
                            </Grid>

                            <Grid item xs={4} sm={4}>
                                <label>?????? ?????? ??????</label>
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <TextField
                                    id="arriveOdometer"
                                    name="arriveOdometer"
                                    variant="outlined"
                                    inputRef={register}
                                    required={true}
                                    size="small"
                                    className={classes.searchWidth}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button type="submit" color="primary">??????</Button>
                        <Button onClick={close} color="primary">??????</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}