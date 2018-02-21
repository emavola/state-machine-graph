function Edge(input, output, dest) {
	this[input] = output;
	this.dest = dest;
	this.dest.incomingEdges.push(this);

	this.equalsTo = edge => {
		if (this.input === edge.input && this.dest.id === edge.dest.id) {
			return true;
		}
		return false;
	};
}

module.exports = Edge;
