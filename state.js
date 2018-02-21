function State(id) {
	this.id = id;
	this.edges = [];
	this.incomingEdges = [];
	this.stateMachine = undefined;
	this.merged = undefined;

	this.equalsTo = state => {
		for (let x; x < this.edges.length; x++) {
			let c = 0;
			for (let y; y < state.edges.length; y++) {
				if (this.edges[x].equalsTo(state.edges[y])) {
					c++;
				}
			}
			if (c === 0) {
				return false;
			}
		}
		return true;
	};

	this.output = input => {
		for (let x = 0; x < this.edges.length; x++) {
			if (this.edges[x][input] !== undefined) {
				return [this.edges[x][input], this.edges[x].dest];
			}
		}
	};

	this.isReachable = () => {
		return this.incomingEdges[0] !== undefined;
	};

	this.addEdges = edges => {
		this.edges = this.edges.concat(edges);
	};

	this.mergeAll = states => {
		states.forEach(state => {
			state.incomingEdges.forEach(x => {
				x.dest = this;
			});
			this.incomingEdges = state.incomingEdges.concat(this.incomingEdges);
			this.stateMachine.delState(state);
		});
	};
}

module.exports = State;
