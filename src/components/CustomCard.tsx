import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, CssBaseline,
    Typography
} from "@material-ui/core";
import {Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";


type CardProps = {
    cardName?:string;
    imgUrl?:string;
    context?:any;
    OnClickLearnMore?: () => void
    OnClickRun?:string; // 임시 로 string
}

export const CustomCard = (props:CardProps) => {
    const [imgURL, setImgUrl] = useState("/main-logo2.png");
    const classes = useStyles();

    useEffect(()=>{
        if(props.imgUrl != undefined){
            setImgUrl(props.imgUrl);
        }
    },[])

    return(
        <CssBaseline>
            <Card className={classes.homeRoot}>
                <CardActionArea>
                    {imgURL ?
                        <CardMedia
                            className={classes.homeMedia}
                            image={imgURL}
                            title="Contemplative Reptile"
                        />
                        /*<img className={classes.homeMedia} src={imgURL}/>*/
                        : <Spinner animation="border" />}
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
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </CssBaseline>
    )
};

const useStyles = makeStyles((theme: Theme) => {

    const drawerWidth = 240;

    return createStyles({

        /**
         * Home
         */
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
});