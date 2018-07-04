import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

function Square(props) {
	return (
		<button className="square" onClick={ props.onClick }>
			{ props.value }
		</button>
	);
}

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
	}

  renderSquare(i) {
    return (
    	<Square
    		value={ this.state.squares[i] }
    		onClick={ () => this.handleClick(i) }
    	/>
    );
  }

  render() {
  	let winner = getWinner(this.state.squares)
			.then(res => res.data);

		console.log(winner);

		let status;

		if (winner === 'X' || winner === 'O') {
			status = 'O ganhador é: ' + winner;
		} else {
			status = 'Vez de: ' + (this.state.xIsNext ? 'X' : 'O');
		}

    return (
      <div>
        <div className="status">{ status }</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function getWinner(squares) {
	const squaresObject = {
		"json_data": JSON.stringify(squares),
	};

	return axios.post('http://localhost:3456/calculate-winner', squaresObject)
	  .then((res) => {
	  	return res;
	  })
	  .catch((err) => {
	  	console.log(err);
	  });
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
