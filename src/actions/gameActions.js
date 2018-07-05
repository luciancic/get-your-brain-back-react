import { GAME_START, GAME_END, GAME_CANCEL, ROUND_START } from './types';

export const startGame = () => ({
    type: GAME_START
})

export const startRound = (position, letter) => ({
    type: ROUND_START,
    payload: { position, letter }
});

export const endGame = () => ({
    type: GAME_END
});

export const cancelGame = () => ({
    type: GAME_CANCEL
})