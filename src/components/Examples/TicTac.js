import React from "react";
import "./TicTac.css";
import { connect } from "react-redux";
import { MOVE, JUMP, SIZE } from "../../store/gameSlice";

const Square = (props) => (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
);

class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        let text = [];
        for (var i = 0; i < this.props.size; i++) {
            let line = [];
            for (var j = 0; j < this.props.size; j++) {
                line.push(this.renderSquare(i * this.props.size + j));
            }
            text.push(
                <div key={i} className="board-row">
                    {line}
                </div>
            );
        }
        return <div>{text}</div>;
    }
}

class Game extends React.Component {
    render() {
        const history = this.props.history;
        const current = history[this.props.stepNumber];

        const moves = history.map((step, move) => {
            const desc = move ? "Перейти к ходу #" + move : "К началу игры";
            return (
                <li key={move}>
                    <button onClick={() => this.props.onJump(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (this.props.winner) {
            status = "Выиграл " + this.props.winner;
        } else {
            status = "Следующий ход: " + (this.props.xIsNext ? "X" : "O");
        }

        return (
            <>
                <select value={this.props.size} onChange={(event) => this.props.onSize(event.target.value)}>
                    <option key="7" value="7">
                        7
                    </option>
                    <option key="10" value="10">
                        10
                    </option>
                    <option key="15" value="15">
                        15
                    </option>
                </select>
                <div className="game">
                    <div className="game-board">
                        <Board squares={current.squares} onClick={(i) => this.props.onMove(i)} size={this.props.size} />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </>
        );
    }
}

const mappropsToProps = (props) => {
    return {
        history: props.game.history,
        stepNumber: props.game.stepNumber,
        xIsNext: props.game.xIsNext,
        winner: props.game.winner,
        size: props.game.size,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMove: (i) => dispatch({ type: MOVE, payload: i }),
        onJump: (i) => dispatch({ type: JUMP, payload: i }),
        onSize: (i) => dispatch({ type: SIZE, payload: i }),
    };
};

export default connect(mappropsToProps, mapDispatchToProps)(Game);
