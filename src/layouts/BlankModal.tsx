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
import {useDispatch} from "react-redux";
import {TransactionSnackbar, TransactionSnackbarPropType} from "../components/snackbar/TransactionSnackbar";
import {VehicleAPI} from "../api/VehicleAPI";
import {VehicleData} from "../model/Vehicle";

const useStyles = makeStyles((theme) => ({
    searchWidth: {
        width: "200px"
    }
}));

type BlankModal = {
    title: string,
    vehicleData: VehicleData,
    onSubmit: () => void
    onClose: () => void
    open: boolean
};

const Button = styled(MuiButton)(spacing);
const Paper = styled(MuiPaper)(spacing);

export function BlankModal(props: BlankModal) {
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

    });

    useEffect(() => {

    }, []);

    const {PostDrivingLogInsert} = VehicleAPI();

    const confirm = () => {

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


                    </DialogContent>

                    <DialogActions>
                        <Button type="submit" color="primary">등록</Button>
                        <Button onClick={close} color="primary">취소</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}