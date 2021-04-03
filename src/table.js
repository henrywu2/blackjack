import { Card } from './card.js';

const Table = props => {
    let yourCards = (
        <div className='row'>
            {props.you.cards}
        </div>
    ), dealerCards = (
        <div className='row'>
            {props.dealer.cards[0]}
            {props.dealer.cards.length > 1 ? <Card blank /> : null}
            {props.dealer.cards.slice(2)}
        </div>
    );

    if (props.status === 'Press "Deal" to start a new game!') {
        yourCards = <div className='row'></div>;
        dealerCards = <div className='row'></div>;
    } else if (props.debug || ((props.winner !== null || props.status === `It's the dealer's turn! Press "Continue" to have the dealer move.`) && props.status.substring(0, 10) !== 'You busted')) dealerCards = (
        <div className='row'>
            {props.dealer.cards}
        </div>
    );

    return (
        <div id='table'>
            <div className='tableside'>
                <strong className='tabletext'>
                    Your cards are: {props.debug ? acesParse(props.you.values) : ''}
                </strong>
                {yourCards}
            </div>
            <div className='tableside'>
                <strong className='tabletext'>
                    The dealer's cards are: {props.debug ? acesParse(props.dealer.values) : ''}
                </strong>
                {dealerCards}
            </div>
        </div>
    );
}

const acesParse = arr => {
    let total = arr.reduce((curr, next) => curr + next, 0);
    let numAces = arr.reduce((curr, next) => next === 11 ? curr + 1 : curr, 0);
    for (let i = 0; i < numAces; i++) {
        if (total <= 21) break;
        total -= 10;
    }
    return total;
  }

export { Table };