import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const API_KEY = "ea134c3b959845c1383c4125eb380b2f";
const CITY_NAME = "Prague";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        margin: "0 auto",
        padding: theme.spacing(2),
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    month: {
        fontSize: "1.5rem",
    },
    navButton: {
        cursor: "pointer",
    },
    grid: {
        marginTop: theme.spacing(2),
    },
    date: {
        width: "14.28%",
        textAlign: "center",
        padding: theme.spacing(2),
        "&.today": {
            backgroundColor: "#e0e0e0",
        },
        "&.selected": {
            backgroundColor: "#1976d2",
            color: "#ffffff",
        },
    },
}));

function Calendar() {
    const classes = useStyles();
    const [date, setDate] = React.useState(new Date());
    const [weather, setWeather] = React.useState();

    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
            );
            const weatherData = response.data;
            console.log(weatherData);
            setWeather(weatherData.main.temp - 273);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.month} variant="h6">
                    {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
                </Typography>
                <div>
                    <span className={classes.navButton} onClick={handlePrevMonth}>
                        &larr;
                    </span>
                    <span className={classes.navButton} onClick={handleNextMonth}>
                        &rarr;
                    </span>
                </div>
            </div>
            <Grid container className={classes.grid}>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Sun</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Mon</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Tue</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Wed</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Thr</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Fri</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Sat</Typography>
                </Grid>
            </Grid>
            <div>{weather}</div>
        </Paper>
    );
}

export default Calendar;
