import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../redux/actions/root";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        width: "40px",
        marginTop: "0.5rem",
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: "0rem",
        marginTop: "0.5rem",
        width: "80vw",
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        "&:disabled": {
            color: "white",
        },
    },
    btn: {
        marginLeft: "3rem",
    },
    try: {
        marginLeft: "3rem",
        opacity: ".5",
        fontSize: "rem",
        fontStyle: "italic",
    },
}));

function Navbar({ pokemons, setFilter, filter, page }) {
    const classes = useStyles();

    let placeholder = pokemons.length < 1 ? "First catch some pokemons.." : "Live search..";

    let disabled = pokemons.length < 1;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
                        <Link to="/">
                            <TabletMacIcon />
                        </Link>
                    </IconButton>
                    {page !== "pokemon" ? (
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                disabled={disabled}
                                placeholder={placeholder}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                    ) : (
                        <>
                            <Link to="/">
                                <Button color="primary" variant="contained" className={classes.btn}>
                                    Back to overview
                                </Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        pokemons: state.mainReducer.pokemons,
    };
}

const Nav = connect(mapStateToProps, { setFilter })(Navbar);

export default Nav;
