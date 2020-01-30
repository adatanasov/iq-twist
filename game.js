import { Piece } from './piece.js';
import { Pin } from './pin.js';

export class Game {
    constructor(board) {
        this.board = board;
        this.gameOver = false;
        this.pieces = [
            new Piece('G', 4, 2, [['GO', 'G', 'G'], [' ', 'GO', ' ']]),
            new Piece('R', 4, 2, [['RO', ' '], ['R', ' '], ['RO', 'R']]),
            new Piece('Y', 5, 3, [[' ', 'Y', ' '], ['YO', 'Y', ' '], [' ', 'YO', 'YO']]),
            new Piece('B', 4, 1, [['B', 'B', 'BO', 'B']]),
            new Piece('Y', 3, 1, [['Y', 'Y', 'YO']]),
            new Piece('B', 5, 2, [['B', 'B', 'B'], [' ', 'BO', 'BO']]),
            new Piece('R', 4, 1, [[' ', 'R'], ['R', 'RO'], ['R', ' ']]),
            new Piece('G', 3, 2, [[' ', 'G'], ['GO', 'GO']])
        ];
    }

    putPieceOnBoard(piece) {
        this.board.putPiece(piece);
        this._removePieceById(piece.id);
    }

    solve() {
        let isSingleOptionAvailable = true;
        let pinOptions = [];
        while (isSingleOptionAvailable) {
            pinOptions = this._getAvailablePiecesForPins();
            let singleOptions = this._getSingleOptions(pinOptions);
            isSingleOptionAvailable = singleOptions.length > 0;

            if (isSingleOptionAvailable) {
                this._putSingleOptions(singleOptions)
                this.board.print();
            }
        }

        if (pinOptions.length > 0) {     
            let possibleCases = this._getAllPossibleCases(pinOptions);   
            // console.log(possibleCases); 
            
            if (!Array.isArray(possibleCases[0])) {
                // console.log('single pin with options');
                for (let i = 0; i < possibleCases.length; i++) {
                    let option = possibleCases[i];
                    let possibleBoard = this.board.clone();
                    let possiblePieces = this.pieces.slice(0);

                    if (possibleBoard.canFit(option.plan, option.x, option.y, option.pin)) {
                        possibleBoard.putPinOption(option);
                        possiblePieces = possiblePieces.filter(p => p.id !== option.piece.id);
                        // possibleBoard.print();

                        if (possiblePieces.length === 0) {
                            this.pieces = possiblePieces.slice(0);
                            this.board = possibleBoard.clone();
                            this.gameOver = true;
                            return;
                        }

                    }

                    // console.log('single pin with options before _canPutRemainingPieces');
                    if (this._canPutRemainingPieces(possibleBoard, possiblePieces)) {
                        return;
                    } else {
                        continue;
                    }
                }
            } else {            
                // console.log('multiple pins with options');
                for (let i = 0; i < possibleCases.length; i++) {
                    let casesToTry = possibleCases[i];
                    let possibleBoard = this.board.clone();
                    let possiblePieces = this.pieces.slice(0);

                    for (let ca = 0; ca < casesToTry.length; ca++) {
                        let option = casesToTry[ca];
                        if (possibleBoard.canFit(option.plan, option.x, option.y, option.pin)) {
                            possibleBoard.putPinOption(option);
                            possiblePieces = possiblePieces.filter(p => p.id !== option.piece.id);

                            if (possiblePieces.length === 0) {
                                this.pieces = possiblePieces.slice(0);
                                this.board = possibleBoard.clone();
                                this.gameOver = true;
                                return;
                            }

                        } else {
                            break;
                        }
                    }

                    if (this._canPutRemainingPieces(possibleBoard, possiblePieces)) {
                        return;
                    }
                }
            }
        }

        if (this.pieces.length === 0) {
            this.gameOver = true;
            return;
        }

        // console.log('no pin options before _canPutRemainingPieces');
        if (this._canPutRemainingPieces(this.board, this.pieces)) {
            return;
        }        
    }

    _canPutRemainingPieces(someBoard, somePieces) {
        let possiblePieces = somePieces.slice(0).sort(function (a, b) {
            return b.area - a.area;
        });
        // console.log("_canPutRemainingPieces possiblePieces");
        // console.log(possiblePieces);

        let possibleMoves = this._getPossibleMovesForPiece(someBoard, possiblePieces[0]);
        // console.log("possibleMoves");
        // console.log(possibleMoves);
        for (let i = 0; i < possibleMoves.length; i++) {
            let move = possibleMoves[i];
            let newBoard = someBoard.clone();
            // console.log("newBoard");
            // console.table(newBoard.state);
            // console.log("move");
            // console.log(move);
            newBoard.putPinOption(move);
            let newPieces = possiblePieces.slice(0).filter(p => p.id !== move.piece.id);

            if (newPieces.length === 0) {
                this.pieces = newPieces.slice(0);
                this.board = newBoard.clone()
                this.gameOver = true;
                return true;
            }

            if (this._canPutRemainingPieces(newBoard, newPieces)) {
                return true;
            } else {
                continue;
            }
        }

        return false;
    }

    _getPossibleMovesForPiece(someBoard, somePiece) {
        let emptySpaces = this._getEmptySpaces(someBoard);
        // console.log("_getPossibleMovesForPiece");
        let result = [];
        for (let i = 0; i < emptySpaces.length; i++) {
            let space = emptySpaces[i];
            let pin = new Pin('Z', space[0], space[1]);
            let piecePinResult = someBoard.tryPieceOnPosition(somePiece, pin);
            if (piecePinResult.some(p => p)) {
                for (let res = 0; res < piecePinResult.length; res++) {
                    result.push(piecePinResult[res]);
                }
            }
        }

        return result;
    }

    _getEmptySpaces(someBoard) {
        let result = [];
        for (let i = 0; i < someBoard.state.length; i++) {
            for (let j = 0; j < someBoard.state[i].length; j++) {
                if (someBoard.state[i][j] === ' ') {
                    result.push([i, j]);
                }
            }
        }

        return result;
    }

    _getAllPossibleCases(arr) {
        let all = arr.reduce(function (accumulator, currentValue) {
            if (accumulator.length === 0) {
                return currentValue;
            }

            let result = [];
            for (let i = 0; i < accumulator.length; i++) {
                for (let j = 0; j < currentValue.length; j++) {
                    result.push([accumulator[i], currentValue[j]].flat());
                }
            }
            return result;
        }, []);

        return all;
    }

    _getAvailablePiecesForPins() {
        let freePins = this.board.getFreePins();
        let pinOptions = [];
        for (let i = 0; i < freePins.length; i++) {
            pinOptions[i] = [];
            let pin = freePins[i];
            let availablePieces = this.pieces.filter(p => p.color === pin.color);
            for (let pi = 0; pi < availablePieces.length; pi++) {
                let piece = availablePieces[pi];
                let piecePinResult = this.board.tryPieceOnPin(piece, pin);
                if (piecePinResult.some(p => p)) {
                    for (let res = 0; res < piecePinResult.length; res++) {
                        pinOptions[i].push(piecePinResult[res]);
                    }
                }
            }
        }

        //console.log(pinOptions);
        return pinOptions;
    }

    _getSingleOptions(pinOptions) {
        return pinOptions.filter(o => o.length === 1);
    }

    _isSingleOptionAvailable(pinOptions) {
        return pinOptions.some(o => o.length === 1);
    }

    _putSingleOptions(singleOptions) {
        for (let i = 0; i < singleOptions.length; i++) {
            let option = singleOptions[i][0];
            this.board.putPinOption(option);
            this._removePieceById(option.piece.id);
        }
    }

    _removePieceById(id) {
        this.pieces = this.pieces.filter(p => p.id !== id);
    }
}