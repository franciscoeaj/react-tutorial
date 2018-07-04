const express = require('express');
const bodyParser = require('body-parser');
const port = 3456;
const ip = 'localhost';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

console.log('Servidor executando na porta: ' + port);
console.log('Para matar o servidor pressione CTRL + C');
app.listen(port);

app.post('/calculate-winner', (req, res) => {
	const winner = calculateWinner(JSON.parse(req.body.json_data));

	if (winner) {
		console.log('O vencedor é: ' + winner);
		res.status(200).send(winner);
	} else {
		console.log('Ainda sem vencedor definido');
		res.status(200).send(null);
	}
});

const calculateWinner = (squares) => {
	const possibleWins = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < possibleWins.length; i++) {
		const [a, b, c] = possibleWins[i];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
};