const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30,
		this.heap = new MaxHeap;
	}

	push(data, priority) {
		if (this.maxSize > this.heap.heapSize) {
			this.heap.push(data, priority);
		} else {
			throw new Error();
		}
	}

	shift() {
		let value = this.heap.root.data;
		this.heap.pop();
		return value;
	}

	size() {
		return this.heap.heapSize;
	}

	isEmpty() {
		return !this.heap.heapSize;
	}
}

module.exports = PriorityQueue;
