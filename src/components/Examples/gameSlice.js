import { update } from "../../store/utility";

export const MOVE = "MOVE";
export const JUMP = "JUMP";
export const SIZE = "SIZE";

const initialState = {
    history: [
        {
            squares: [],
        },
    ],
    stepNumber: 0,
    xIsNext: true,
    winner: 0,
    size: 7,
};

var winner = 0;

function countLine(squares, x, y, x_delta, y_delta, size) {
    var q, x_count, o_count;
    x_count = 0;
    o_count = 0;
    for (q = 0; q <= 4; q++) {
        if (x + x_delta * q < size && x + x_delta * q >= 0 && y + y_delta * q < size && y + y_delta * q >= 0) {
            var c = squares[(x + x_delta * q) * size + (y + y_delta * q)];
            if (c === "O" && x_count === 0) o_count++;
            else if (c === "X" && o_count === 0) x_count++;
            else break;
        } else break;
    }
    if (x_count >= 5) winner = "X";
    if (o_count >= 5) winner = "O";
}

function checkWin(squares, size) {
    winner = 0;
    for (var x = 0; x < size; x++)
        for (var y = 0; y < size; y++)
            if (squares[x * size + y] !== null) {
                if (winner !== 0) break;
                countLine(squares, x, y, 1, 0, size);
                if (winner !== 0) break;
                countLine(squares, x, y, 0, 1, size);
                if (winner !== 0) break;
                countLine(squares, x, y, 1, 1, size);
                if (winner !== 0) break;
                countLine(squares, x, y, 1, -1, size);
            }
    return winner;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVE:
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (checkWin(squares, state.size) || squares[action.payload]) {
                return state;
            }
            squares[action.payload] = state.xIsNext ? "X" : "O";
            return update(state, {
                history: history.concat([
                    {
                        squares: squares,
                    },
                ]),
                stepNumber: history.length,
                xIsNext: !state.xIsNext,
                winner: checkWin(squares, state.size),
            });
        case JUMP:
            return update(state, { stepNumber: action.payload, xIsNext: action.payload % 2 === 0 });

        case SIZE:
            return update(state, {
                size: action.payload,
                history: [
                    {
                        squares: [],
                    },
                ],
                stepNumber: 0,
                xIsNext: true,
                winner: 0,
            });

        default:
            return state;
    }
};

export default reducer;
