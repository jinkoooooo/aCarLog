import React, {useState} from "react";
import styled from "styled-components/macro";


import {
    Grid,
    Divider as MuiDivider,
    Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";


const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function DashBoard() {

    return (
        <React.Fragment>
            <Grid justify="space-between" container spacing={6}>
                <Grid item>
                    <Typography variant="h3" gutterBottom>
                        Dashboard
                    </Typography>
                </Grid>

            </Grid>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={6} lg={3} xl>
                    안녕하세요. ACL(A Car Log) 시스템 입니다.
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={3} xl>
                    이것은 현재 개발중인 사내 차량 운행 일지 시스템 입니다.
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={3} xl>
                    많은 관심 부탁드립니다.
                </Grid>
            </Grid>

            <Grid container spacing={6}>
                <Grid item xs={12} lg={8}>

                </Grid>

                <Grid item xs={12} lg={4}>
                    ReactJS + Typescript + MaterialUI + JG
                </Grid>
            </Grid>

            <Grid container spacing={6}>
                <Grid item xs={12} lg={8}>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DashBoard;
