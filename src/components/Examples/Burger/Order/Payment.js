import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";

const Payment = (props) => (
    <div id="PaymentForm">
        <Cards number={props.number} name={props.name} expiry={props.expiry} cvc={props.cvc} focused={props.focus} />

        <Container component="main" maxWidth="md">
            <br />
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        name="name"
                        label="Name on card"
                        fullWidth
                        onChange={props.handleInputChange}
                        onFocus={props.handleInputFocus}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        name="number"
                        label="Card number"
                        fullWidth
                        onChange={props.handleInputChange}
                        onFocus={props.handleInputFocus}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        name="expiry"
                        label="Expiry date"
                        fullWidth
                        onChange={props.handleInputChange}
                        onFocus={props.handleInputFocus}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="CVC"
                        name="cvc"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        onChange={props.handleInputChange}
                        onFocus={props.handleInputFocus}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid>
        </Container>
    </div>
);

export default Payment;
