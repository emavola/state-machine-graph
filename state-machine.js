function StateMachine(startStateId, states, inputs) {
	this.startStateId = startStateId;
	this.states = states;
	this.inputs = inputs;
	states.forEach(st => {
		st.stateMachine = this;
	});

	this.delState = state => {
		this.states = this.states.filter(el => {
			if (el.id === state.id) {
				return false;
			}
			return true;
		});
	};

	this.addState = state => {
		this.states.push(state);
		state.stateMachine = this;
	};

	this.byId = id => {
		for (let x = 0; x < this.states.length; x++) {
			if (id === this.states[x].id) {
				return this.states[x];
			}
		}
	};

	this.delUnreachables = () => {
		if (this.startStateId !== undefined) {
			this.states = this.states.filter(st => {
				return (!st.isReachable()) && (this.startStateId !== st.id);
			});
		}
	};

	this.seqInp = (seq, stateId) => {
		let ret = '';
		let state = this.byId(stateId);
		seq.split('').forEach(inp => {
			const out = state.output(inp);
			ret += out[0];
			state = out[1];
		});
		return ret;
	};

	this.toObj = () => {
		const obj = {};
		this.states.forEach(st => {
			const inp = {};
			this.inputs.forEach(input => {
				inp[input] = [st.output(input)[1].id, st.output(input)[0]];
			});
			obj[st.id] = inp;
		});
		return obj;
	};

	this.toString = () => {
		return JSON.stringify(this.toObj(), '', 4);
	};
}

module.exports = StateMachine;
