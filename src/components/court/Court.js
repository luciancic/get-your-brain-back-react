// Component shared across Game and Tutorial
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import IndicatorBar from './IndicatorBar';
import Letters from './Letters';
import MatchButton from './MatchButton';
import PositionBoard from './PositionBoard';
import escapeable from '../escapeable';

import './Court.css';

class Court extends Component {
    render() {
        const { 
            audioPlayed, 
            gameRunning,
            isTutorial, 
            letters, 
            lettersButtonColor,
            maxRounds, 
            n,
            positionHandler,
            lettersHandler,
            playAudio, 
            positions, 
            positionsButtonColor, 
            remainingRounds, 
            roundActive, 
        } = this.props;

        return <div className="court">
            <IndicatorBar maxRounds={maxRounds} remainingRounds={remainingRounds} n={n} />
            <PositionBoard active={roundActive} currentPosition={positions[0]}/>
            <Letters roundActive={roundActive} currentLetter={letters[0]} audioPlayed={audioPlayed} playAudio={playAudio}/>
            <div className="court-buttons">
                {/* TODO: extract match function to make it usable in tutorial */}
                <MatchButton color={positionsButtonColor} name="Match Position" onClick={positionHandler}/>
                <MatchButton color={lettersButtonColor} name="Match Letter" onClick={lettersHandler}/>
                {/* <button className={`btn ${positionsButtonColor} lighten-4 blue-text text-darken-4`}>Match Position</button>
                <button className={`btn ${lettersButtonColor} lighten-4 blue-text text-darken-4`}>Match Letter</button> */}
            </div>
            { gameRunning || isTutorial ?  null : <Redirect to="/" /> }
        </div>
    }
}

export default escapeable(Court);