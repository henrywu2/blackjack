import React from 'react';

const Buttons = props => {
    if (props.status === 'Press "Deal" to start a new game!') return (
        <div id='buttons'>
            <button onClick={() => props.deal()}>
                Deal
            </button>
        </div>
    );
    else if (props.status === 'Press "Hit" or "Stand" as you please.') return (
        <div id='buttons'>
            <button onClick={() => props.hit()}>
                Hit
            </button>
            <button onClick={() => props.stand()}>
                Stand
            </button>
        </div>
    );
    else if (props.status === `It's the dealer's turn! Press "Continue" to have the dealer move.`) return (
        <div id='buttons'>
            <button onClick={() => props.stand()}>
                Continue
            </button>
        </div>
    );
    return null;
}

export { Buttons };