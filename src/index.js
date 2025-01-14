//todo: add ASCII art for backs during cheat
//todo: fix what happens when you had an ace and draw another one
//test case: draw all Aces?
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Buttons } from './buttons.js';
import { Card } from './card.js';
import { Table } from './table.js';
class Game extends React.Component {
  constructor(props) {
    super(props);
    let deck = [], deckVals = [];
    for (let val of ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']) {
      for (let suit of ['Clubs', 'Diamonds', 'Hearts', 'Spades']) {
        deck.push(<Card value={val} suit={suit} />);
        deckVals.push(cardValue(val));
      }
    }

    this.state = {
      deck: deck,
      deckValues: deckVals,
      you: {
        cards: [],
        values: [],
      },
      dealer: {
        cards: [],
        values: [],
      },
      money: 10,
      bet: null,
      tempBet: null,
      winner: null,
      status: null,
      cheat: false,
      debug: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.bet = this.bet.bind(this);
    this.deal = this.deal.bind(this);
    this.hit = this.hit.bind(this);
    this.stand = this.stand.bind(this);
  }

  deal() {
    if (this.state.deck.length === 52 || this.state.winner !== null) {
      let deck = [], deckVals = [];
      for (let val of ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']) {
        for (let suit of ['Clubs', 'Diamonds', 'Hearts', 'Spades']) {
          deck.push(<Card value={val} suit={suit} />);
          deckVals.push(cardValue(val));
        }
      }

      let yourCards = [], yourVals = [], dealerCards = [], dealerVals = [];
      for (let i = 0; i < 4; i++) {
        const rand = this.state.debug ? 2 : Math.floor(Math.random() * deck.length);
        const card = deck[rand], val = deckVals[rand];
        deck.splice(rand, 1);
        deckVals.splice(rand, 1);
        if (i < 2) {
          yourCards.push(card);
          yourVals.push(val);
        } else {
          dealerCards.push(card);
          dealerVals.push(val);
        }
      }

      this.setState({
        deck: deck,
        deckValues: deckVals,
        you: {
          cards: yourCards,
          values: yourVals,
        },
        dealer: {
          cards: dealerCards,
          values: dealerVals,
        },
        winner: null,
        status: 'Press "Hit" or "Stand" as you please.',
      });
    }
  }

  hit() {
    if (this.state.winner === null && this.state.deck.length <= 48) {
      const rand = this.state.debug ? 0 : Math.floor(Math.random() * this.state.deck.length);
      const card = this.state.deck[rand], val = this.state.deckValues[rand];
      this.state.deck.splice(rand, 1);
      this.state.deckValues.splice(rand, 1);
      let yourTotal = acesParse(this.state.you.values.concat(val));
      if (yourTotal > 21) {
        this.setState({
          winner: 'dealer',
          status: `You busted with a total of ${yourTotal}! You lose!`,
          money: this.state.money - this.state.bet,
          tempBet: null,
          bet: null,
        });
      }
      
      this.setState({
        you: {
          cards: this.state.you.cards.concat(card),
          values: this.state.you.values.concat(val),
        },
      });
    }
  }

  stand() {
    if (this.state.winner === null && this.state.deck.length <= 48) {
      this.setState({ status: `It's the dealer's turn! Press "Continue" to have the dealer move.` });
      let yourTotal = acesParse(this.state.you.values), dealerTotal = acesParse(this.state.dealer.values);
      if (dealerTotal >= 17 && !this.state.cheat) {
        if (yourTotal > dealerTotal) {
          this.setState({
            winner: 'you',
            status: `Your total of ${yourTotal} beat the dealer's total of ${dealerTotal}! You win!`,
            money: this.state.money + this.state.bet,
            tempBet: null,
            bet: null,
          });
        } else if (yourTotal < dealerTotal) {
          this.setState({
            winner: 'dealer',
            status: `The dealer's total of ${dealerTotal} beat your total of ${yourTotal}! You lose!`,
            money: this.state.money - this.state.bet,
            tempBet: null,
            bet: null,
          });
        } else {
          this.setState({
            winner: 'dealer',
            status: `You and the dealer tied with a total of ${yourTotal}! Your bet from this round will be added to next round's bet.`,
            tempBet: null,
          });
        }
      } else {
        const rand = this.state.debug ? 0 : Math.floor(Math.random() * this.state.deck.length);
        const card = this.state.deck[rand], val = this.state.deckValues[rand];
        this.state.deck.splice(rand, 1);
        this.state.deckValues.splice(rand, 1);
        dealerTotal = acesParse(this.state.dealer.values.concat(val));
        if (dealerTotal > 21) {
          this.setState({
            winner: 'you',
            status: `The dealer busted with a total of ${dealerTotal}! You win!`,
            money: this.state.money + this.state.bet,
            tempBet: null,
            bet: null,
          });
        } else if (dealerTotal >= 17 && !this.state.cheat) {
          if (yourTotal > dealerTotal) {
            this.setState({
              winner: 'you',
              status: `Your total of ${yourTotal} beat the dealer's total of ${dealerTotal}! You win!`,
              money: this.state.money + this.state.bet,
              tempBet: null,
              bet: null,
            });
          } else if (yourTotal < dealerTotal) {
            this.setState({
              winner: 'dealer',
              status: `The dealer's total of ${dealerTotal} beat your total of ${yourTotal}! You lose!`,
              money: this.state.money - this.state.bet,
              tempBet: null,
              bet: null,
            });
          } else {
            this.setState({
              winner: 'dealer',
              status: `You and the dealer tied with a total of ${yourTotal}! Your bet from this round will be added to next round's bet.`,
              tempBet: null,
            });
          }
        }

        this.setState({
          dealer: {
            cards: this.state.dealer.cards.concat(card),
            values: this.state.dealer.values.concat(val),
          }
        });
      }
    }
  }

  handleChange(event) {
    if (event.target.value === '3.141592653') {
      alert('Cheat activated!');
      this.setState({ cheat: true });
    }
    this.setState({ tempBet: event.target.value });
  }

  bet(event) {
    this.setState({
      bet: this.state.bet ? this.state.bet + parseInt(this.state.tempBet) : parseInt(this.state.tempBet),
      status: 'Press "Deal" to start a new game!',
    });
    event.preventDefault();
  }

  render() {
    let bet = null, bankrupt = null;
    if (this.state.status === null || (this.state.winner !== null && this.state.status !== 'Press "Deal" to start a new game!')) bet = (
      <form id='bet' onSubmit={this.bet}>
        <label>
          Enter bet: $
          <input type='number' min='1' max={this.state.money} onChange={this.handleChange} required />
        </label>
        <input type='submit' value='Bet' />
      </form>
    );

    if (this.state.money <= 0) bankrupt = (
      <div id='bankrupt'>
        <strong>Oh no, you're out of money!<br></br>Refresh the browser to start over.</strong>
      </div>
    );

    return (
      <main class={this.state.cheat ? 'cheat' : ''}>
        <div id='cover' class={this.state.money <= 0 ? 'fade' : ''}>
          <div id='slide' class={this.state.money <= 0 ? 'hidden' : ''}>
            {bankrupt}
          </div>
        </div>
        <header>
          <h1>
            Let's play Blackjack!
          </h1>
        </header>
        <section>
          <button onClick={() => this.setState({ debug: !this.state.debug })}>
            Debug is {this.state.debug ? 'ON' : 'OFF'}
          </button>
          <p id='info'>
            Balance: ${this.state.money}<br></br>
            Bet: ${this.state.bet}
          </p>
          <p id='status'>
            <strong>{this.state.status}</strong>
          </p>
          {bet}
          <Buttons deal={this.deal} hit={this.hit} stand={this.stand} status={this.state.status} />
        </section>
        <Table you={this.state.you} dealer={this.state.dealer} winner={this.state.winner} status={this.state.status} debug={this.state.debug}/>
      </main>
    );
  }
}

const cardValue = val => {
  if (val === 'A') return 11;
  else if (val === 'J' || val === 'Q' || val === 'K') return 10;
  else return parseInt(val);
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);