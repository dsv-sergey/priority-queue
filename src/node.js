class Node {
	constructor(data, priority) {
		this.data = data,
		this.priority = priority,
		this.parent = null,
		this.left = null,
		this.right = null;
	  }
	
	  appendChild(node) {
		if (node) {
		  if (!this.left) {
			this.left = node;
			node.parent = this;
		  } else if (!this.right) {
			this.right = node;
			node.parent = this;
		  }
		}
	  }
	
	  removeChild(node) {
		if (node) {
		  let current = this;
		  if (node === current.left) {
			current.left = null;
			node.parent = null;
		  } else if (node === current.right) {
			current.right = null;
			node.parent = null;
		  } else {
			throw new Error();
		  }
		}
	  }
	
	  remove() {
		if (this.parent) {
		  let current = this.parent;
		  current.removeChild(this);
		}
	  }
	
	  swapWithParent() {
		if (this.parent) {
		  let parent = this.parent,
			  currentLeft = this.left,
			  currentRight = this.right;
		  this.remove();
		  if (parent.parent) {
			let grandParent = parent.parent;
			parent.remove();
			grandParent.appendChild(this);
		  }
		  if (currentLeft || currentRight) {
			currentLeft.remove();
			currentRight ? currentRight.remove() : null;
			if (parent.left) {
			  let parentLeftChild = parent.left;
			  parentLeftChild.remove();
			  this.appendChild(parentLeftChild);
			  this.appendChild(parent);
			}
			if (parent.right) {
			  let parentRightChild = parent.right;
			  parentRightChild.remove();
			  this.appendChild(parent);
			  this.appendChild(parentRightChild);
			}
			this.appendChild(parent);
			parent.appendChild(currentLeft);
			parent.appendChild(currentRight);
		  } else {
			if (parent.left) {
			  let parentLeftChild = parent.left;
			  parentLeftChild.remove();
			  this.appendChild(parentLeftChild);
			  this.appendChild(parent);
			}
			if (parent.right) {
			  let parentRightChild = parent.right;
			  parentRightChild.remove();
			  this.appendChild(parent);
			  this.appendChild(parentRightChild);
			}
			this.appendChild(parent);
		  }
		}
	  }
}

module.exports = Node;
