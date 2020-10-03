import React from "react";
import SmartDeck from "./SmartDeck.jsx";
import SmartPile from "./SmartPile.jsx";
import SmartFoundation from "./SmartFoundation.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import range from "lodash/range";
import { connect } from "react-redux";
import ActionCreators from "../../actions";
import {  Dimensions } from "../../constants";
import Background from "../../../../assets/images/table.png"

class Game extends React.Component {
    turnCard = () => {
        const { dispatch } = this.props;
        dispatch(ActionCreators.turnCard());
    };

    moveCards = (cards, where) => {
        const { dispatch } = this.props;
        dispatch(ActionCreators.moveCard(cards, where));
    };

    render() {
        const { game } = this.props;
        const { moveCards, turnCard } = this;
        return (
            <DndProvider backend={HTML5Backend}>
                <div
                    style={{
                        width: Dimensions.Game.width,
                        height: Dimensions.Game.height,
                        // backgroundColor: Colors.Game.backgroundColor,
                        backgroundImage: `url(${Background})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'repeat',
                        padding: 10,
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <SmartDeck deck={game.DECK} turnCard={turnCard} />
                        <div
                            style={{
                                width: 540,
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <SmartFoundation suit="HEARTS" cards={game.FOUNDATION.HEARTS} moveCards={moveCards} />
                            <SmartFoundation suit="DIAMONDS" cards={game.FOUNDATION.DIAMONDS} moveCards={moveCards} />
                            <SmartFoundation suit="CLUBS" cards={game.FOUNDATION.CLUBS} moveCards={moveCards} />
                            <SmartFoundation suit="SPADES" cards={game.FOUNDATION.SPADES} moveCards={moveCards} />
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: 40,
                        }}
                    >
                        {range(0, 6).map((index) => (
                            <SmartPile cards={game.PILE[index]} index={index} key={index} moveCards={moveCards} />
                        ))}
                    </div>
                </div>
            </DndProvider>
        );
    }
}

export default connect((state) => {
    return { game: state.game.toJS(), score: state.score };
})(Game);
