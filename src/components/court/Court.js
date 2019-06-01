// Component shared across Game and Tutorial
import React, { Component } from 'react'
import IndicatorBar from './IndicatorBar'
import Letters from './Letters'
import MatchButton from './MatchButton'
import PositionBoard from './PositionBoard'
import escapeable from '../escapeable'
import { mapFeedbackColor } from '../../utils'

import './Court.css'

export class Court extends Component {
    state = {
        canPlayAudio: false,
        currentRound: -1,
<<<<<<< HEAD
        roundActive: false
=======
        isRoundActive: false,
        feedback: {
            letters: null,
            positions: null
        },
        userAnswered: {
            positions: false,
            letters: false
        }
>>>>>>> a6f1b57712b6eb5ead5ed6d73426065e644f8d0a
    }

    componentDidMount() {
        const { endGame, duration, maxRounds, n } = this.props;
        
        // First round starts immediately.
        this.playRound();

        // Set up a round loop.
        this.interval = setInterval(() => {
            // Do not destructure currentRound because it needs to check value by reference.
            if (this.state.currentRound === maxRounds + n - 1) {
                // if endGame handler provided, call it
                // else repeat the game again
                if (endGame) return endGame()
                else return setTimeout(() => { this.playRound() }, 1000)
            }
            this.playRound();
        }, duration + 300);

        window.addEventListener('keydown', this.gameListener, false);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        window.removeEventListener('keydown', this.gameListener, false);
    }
<<<<<<< HEAD
=======

    // Don't use this function directly. Rather, use its bound versions:
    // checkPositions and checkLetters
    checkAnswer = (stim) => { 
        const { n } = this.props
        const { currentRound, isRoundActive, userAnswered } = this.state

        if (currentRound < n || !isRoundActive || userAnswered[stim]) return;
        else {
            let newState = { 
                feedback: this.state.feedback, 
                userAnswered: this.state.userAnswered
            }
            const arr = this.props[stim]
            const isAnswerCorrect = arr[currentRound] === arr[currentRound - n]
            
            newState.feedback[stim] = isAnswerCorrect ? 'correct' : 'mistake'
            newState.userAnswered[stim] = true
            this.setState(newState)
        }
    }
    checkPositions = this.checkAnswer.bind(this, 'positions')
    checkLetters = this.checkAnswer.bind(this, 'letters')

    checkMissed = () => {
        const { n } = this.props
        const { currentRound, userAnswered } = this.state
        // debugger;
        if (currentRound < n) return;
        else {
            checkFor.call(this, 'positions')
            checkFor.call(this, 'letters')
        }

        function checkFor(stim) {
            if (userAnswered[stim]) return;
            else {
                let newState = { feedback: this.state.feedback }
                const arr = this.props[stim]
                const isAnswerMissed = arr[currentRound] === arr[currentRound - n]
                
                if (isAnswerMissed) {
                    newState.feedback[stim] = 'missed'
                    this.setState(newState)
                }
            }
        }
    }
>>>>>>> a6f1b57712b6eb5ead5ed6d73426065e644f8d0a
    
    gameListener = (e) => {
        switch (e.key) {
            case 'Escape':
                this.props.cancelGame();
                break;
            case 'a':
<<<<<<< HEAD
                this.props.answer('positions');
                break;
            case 'l':
                this.props.answer('letters');
=======
                this.checkPositions();
                break;
            case 'l':
                this.checkLetters();
>>>>>>> a6f1b57712b6eb5ead5ed6d73426065e644f8d0a
                break;
            default:
                break;
        }
    }

    playRound = () => {
        const { duration } = this.props;
        
        this.setState({ 
            canPlayAudio: true,
            currentRound: this.state.currentRound + 1,
<<<<<<< HEAD
            roundActive: true
        })
        this.timeout = setTimeout(() => {
            this.setState({ roundActive: false });
=======
            isRoundActive: true,
            feedback: {
                positions: null,
                letters: null
            },
            userAnswered: {
                positions: false,
                letters: false
            }
        })
        this.timeout = setTimeout(() => {
            this.setState({ isRoundActive: false })
            this.checkMissed()
>>>>>>> a6f1b57712b6eb5ead5ed6d73426065e644f8d0a
        }, duration);
    }


    render() {
        const { 
            letters, 
            maxRounds, 
            n,
            positions, 
<<<<<<< HEAD
            positionsButtonColor, 
            positionHandler,
            shouldRedirect 
        } = this.props
        const { canPlayAudio, currentRound, roundActive } = this.state

        return <div className="court">
            <IndicatorBar maxRounds={maxRounds} currentRound={currentRound} n={n} />
            <PositionBoard active={roundActive} currentPosition={positions[this.state.currentRound]}/>
=======
        } = this.props
        const { canPlayAudio, currentRound, isRoundActive } = this.state
        const positionsColor = mapFeedbackColor(this.state.feedback.positions)
        const lettersColor = mapFeedbackColor(this.state.feedback.letters)

        return <div className="court">
            <IndicatorBar maxRounds={maxRounds} currentRound={currentRound} n={n} />
            <PositionBoard active={isRoundActive} currentPosition={positions[currentRound]}/>
>>>>>>> a6f1b57712b6eb5ead5ed6d73426065e644f8d0a
            <div className="court-buttons">
                <MatchButton color={positionsColor} name="Match Position" onClick={this.checkPositions}/>
                <MatchButton color={lettersColor} name="Match Letter" onClick={this.checkLetters}/>
            </div>
<<<<<<< HEAD
            <Letters active={roundActive} currentLetter={letters[this.state.currentRound]} canPlayAudio={canPlayAudio} disableAudio={() => this.setState({ canPlayAudio: false })}/>
            { shouldRedirect ?  <Redirect to="/" /> : null  } 
=======
            <Letters active={isRoundActive} currentLetter={letters[currentRound]} canPlayAudio={canPlayAudio} disableAudio={() => this.setState({ canPlayAudio: false })}/>
>>>>>>> a6f1b57712b6eb5ead5ed6d73426065e644f8d0a
        </div>
    }
}

export default escapeable(Court);