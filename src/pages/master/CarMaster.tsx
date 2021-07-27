import React, {useState} from "react";
import styled from "styled-components/macro";
import imgCar_1 from "../../../public/mcb2.jpg"

import {
    Grid,
    Divider as MuiDivider,
    Typography as MuiTypography, Paper,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {CustomCard} from "../../components/CustomCard";


const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function CarMaster() {

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
                <Grid item xs={12} sm={12} md={6} lg={3} xl>
                    <Paper>
                        <CustomCard
                            cardName={"Avante AD"}
                            context={<>현실적인 차량
                                <br/>
                                주행거리 : 35,000 km
                                <br/>
                                연식 : 2020 년식</>}
                            imgUrl={"/avante.JPG"}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={3} xl>
                    <Paper>
                        <CustomCard
                            cardName={"BMW 5 Series"}
                            context={<>영혼을 끌어모은 차량
                                <br/>
                                주행거리 : 15,000 km
                                <br/>
                                연식 : 2021 년식</>}
                            imgUrl={"/bmw5.JPG"}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={3} xl>
                    <Paper>
                        <CustomCard
                            cardName={"Mercedes Benz Maybach S-Class"}
                            context={<>이번생에 탈 수 있을까?
                                <br/>
                                주행거리 : 5,000 km
                                <br/>
                                연식 : 2021 년식</>}
                            imgUrl={"/vanzS.JPG"}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default CarMaster;
