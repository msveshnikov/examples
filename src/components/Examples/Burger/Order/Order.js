import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        borderRadius: 7,
        width: 400,
        height: 250,
        padding: theme.spacing(1),
        margin: theme.spacing(1),

        position: "relative",
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: "url(https://images.unsplash.com/photo-1586511926652-02f61795e70d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    actionArea: {
        "&:hover, &:focus, &:visited, &:link, &:active": {
            textDecoration: "none",
        },
    },
}));

const Order = (props) => {
    const classes = useStyles();

    let ingredients = [];
    for (let key in props.ingredients) {
        if (props.ingredients[key] > 0)
            ingredients.push(
                <span
                    key={key}
                    style={{
                        textTransform: "capitalize",
                        backgroundColor: "yellow",
                        color: "black",
                        display: "inline-block",
                        margin: "0 8px",
                        border: "1px solid #ccc",
                        padding: "2px",
                    }}
                >
                    {key} ({props.ingredients[key]})
                </span>
            );
    }

    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="subtitle1">Address: {JSON.stringify(props.address)}</Typography>
                    <Typography variant="body2" component="p">
                        Price: <strong>{(props.price * 25).toFixed(0)} </strong>Kč
                    </Typography>
                    <Typography variant="body2" component="p">
                        Ingredients: {ingredients}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.time}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={props.delete}>
                        Delete
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default React.memo(Order);
