import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {
  Button as MuiButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider as MuiDivider,
  FormControl,
  TextField,
  Grid,
  Typography,
  NativeSelect, Dialog,
  Paper as MuiPaper
} from "@material-ui/core";
import {useForm} from "react-hook-form";

import styled from "styled-components/macro";
import {spacing} from "@material-ui/system";
import {makeStyles} from "@material-ui/core/styles";
import {TransactionSnackbar, TransactionSnackbarPropType} from "../../../components/snackbar/TransactionSnackbar";
import {DrivingLog, VehicleData} from "../../../model/Vehicle";
import {VehicleAPI} from "../../../api/VehicleAPI";
import {CellParams, ColDef, DataGrid} from "@material-ui/data-grid";
import {Edit2, Trash2} from "react-feather";
import {useDispatch} from "react-redux";
import {setCurrentPageState} from "../../../redux/reducers/pageStore";


const useStyles = makeStyles((theme) => ({
  searchWidth: {
    width: "200px"
  }
}));

type DrivingLogModal = {
  title: string,
  vehicleData: VehicleData,
  onClose: () => void
  open: boolean
};

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export function DrivingLogModal(props: DrivingLogModal) {
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

  const {register, reset, watch, errors, setValue, setError, clearError, handleSubmit} = useForm();
  const onSubmit = handleSubmit(({OpName, OpType, OpTypeName, fCode, tCode}) => {
    confirm();
  });

  const {GetVehiclesDriveLog} = VehicleAPI();
  const [driveLogList, setDriveLogList] = useState([]);

  const dispatcher = useDispatch();

  useEffect(() => {

  }, []);

  // 데이터변환
  function convertForDataGridList(targetList: DrivingLog[]) {
    let dataGridList: any = new Array();

    targetList.forEach((item, idx) => {
      let index = idx;
      let vehicleId = item.vehicleId;
      let startDateTime = item.startDateTime;
      let arriveDateTime = item.arriveDateTime;
      let drivingOdometer = item.arriveOdometer - item.startOdometer;

      let dataGridObject = {
        'id': (index + 1),
        'vehicleId': vehicleId,
        'startDateTime': startDateTime,
        'arriveDateTime': arriveDateTime,
        'drivingOdometer': drivingOdometer
      }

      dataGridList.push(dataGridObject);
    })

    return dataGridList;
  }

  const confirm = () => {
    /*CreateOperationList(operationPost)
        .then(res => {
          setSnackbarState({
            ...snackbarState,
            open: true,
            message: "등록되었습니다.",
          });

          close();
        })
        .catch(err => {
          setErrorSnackbarState({
            ...errorSnackbarState,
            open: true,
            message: `작업중 에러가 발생하였습니다. ${err}`,
          })
        });*/
  }

  const close = () => {
    if (props.onClose)
      props.onClose();
  }

  const search = () => {
    dispatcher(setCurrentPageState({isLoading: true}));

    GetVehiclesDriveLog(props.vehicleData).then(res => {
      console.log(res);
      let data = (res.data != '') ? res.data : [];
      setDriveLogList(convertForDataGridList(data));

    }).catch(err => {
      console.log(err);
    }).finally(() => {
      dispatcher(setCurrentPageState({isLoading: false}));
    });
  }

  /**------------------------------------------
   *  Data grid column 선언
   *-------------------------------------------*/
  const columns: ColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortable: false,

    },
    {
      field: "vehicleId",
      headerName: "운행 번호",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "startDateTime",
      headerName: "운행 시작시간",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "arriveDateTime",
      headerName: "운행 도착시간",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "drivingOdometer",
      headerName: "운행 거리",
      width: 250,
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
    <>
      <TransactionSnackbar
        {...snackbarState}
        handleClose={snackBarClose}
      />

      <Dialog open={props.open}
              maxWidth="md"
              fullWidth
              style={{ zIndex: 0 }}>
        <TransactionSnackbar
          {...errorSnackbarState}
          handleClose={errorSnackBarClose}
        />

        <form onSubmit={onSubmit}>
          <DialogTitle>
            <Typography gutterBottom>{props.title}</Typography>
          </DialogTitle>

          <DialogContent>
            <Paper>
              <div style={{height: 400, width: '100%' }}>
                <DataGrid
                    showToolbar
                    columns={columns}
                    rows={driveLogList}
                />
              </div>
            </Paper>

          </DialogContent>

          <DialogActions>
            <Button onClick={search} color="primary">조회</Button>
            <Button onClick={close} color="primary">취소</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}