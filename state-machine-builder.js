const fs = require('fs');
const StateMachine = require('./state-machine.js');
const State = require('./state.js');
const Edge = require('./edge.js');

const byObj = obj => {
	const states = [];
	Object.keys(obj).forEach(state => {
		if (state !== 'startStateId') {
			states.push(new State(state));
		}
	});
	const stateMachine = new StateMachine(obj.startStateId, states, Object.keys(obj[Object.keys(obj)[0]]));
	stateMachine.states.forEach(st => {
		const edges = [];
		stateMachine.inputs.forEach(inp => {
			edges.push(new Edge(inp, obj[st.id][inp][1], stateMachine.byId(obj[st.id][inp][0])));
		});
		st.addEdges(edges);
	});
	return stateMachine;
};

const byPath = path => {
	const data = fs.readFileSync(path, 'utf8');
	const obj = JSON.parse(data);
	return byObj(obj);
};
module.exports = {
	byPath,
	byObj
};
