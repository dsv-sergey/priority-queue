const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null, 
		this.parentNodes = [], 
		this.heapSize = 0;
  }

  push(data, priority) {
    let node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    if (!this.isEmpty()) {
      if (this.root) {
        let dataRoot = this.root.data,
          detached = this.detachRoot();
        this.restoreRootFromLastInsertedNode(detached);
        this.shiftNodeDown(this.root);
        return dataRoot;
      }
    }
  }

  detachRoot() {
    let rootNode = this.root;
    if (this.root.left) {
      this.root.left.parent = null;
    }
    if (this.root.right) {
      this.root.right.parent = null;
    }
    this.root = null;
    if (this.parentNodes.includes(rootNode)) {
      this.parentNodes.splice(0, 1);
    }
    this.heapSize--;
    return rootNode;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (this.parentNodes.length > 0) {
      let lastNode = this.parentNodes[this.parentNodes.length - 1];
      if (this.parentNodes.length === 1) {
        this.root = lastNode;
      } else {
        let parentLastNode = lastNode.parent;
        lastNode.remove();
        if (detached.right === lastNode) {
          this.root = lastNode;
          lastNode.appendChild(detached.left);
          this.parentNodes.unshift(this.root);
          this.parentNodes.pop();
        } else if (parentLastNode && !parentLastNode.left) {
          this.root = lastNode;
          lastNode.appendChild(detached.left);
          lastNode.appendChild(detached.right);
          this.parentNodes.pop();
        } else {
          this.root = lastNode;
          lastNode.appendChild(detached.left);
          lastNode.appendChild(detached.right);
          this.parentNodes.unshift(parentLastNode);
          this.parentNodes.pop();
        }
      }
    }
  }

  size() {
    return this.heapSize;
  }

  isEmpty() {
    return !this.heapSize;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  insertNode(node) {
    if (!this.root) {
      this.root = node;
      this.parentNodes[0] = node;
    } else if (!this.parentNodes[0].left) {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
      this.parentNodes.shift();
    }
    this.heapSize++;
  }

  shiftNodeUp(node) {
    if (node.parent && node.parent.priority < node.priority) {
      let nodeInParentNodes = this.parentNodes.indexOf(node),
        parentInParentNodes = this.parentNodes.indexOf(node.parent);
      this.root = node.parent === this.root ? node : this.root;
      if (nodeInParentNodes !== -1 && parentInParentNodes !== -1) {
        this.parentNodes[nodeInParentNodes] = node.parent;
        this.parentNodes[parentInParentNodes] = node;
      } else {
        this.parentNodes[nodeInParentNodes] = node.parent;
      }
      node.swapWithParent();
      this.shiftNodeUp(node);
    }
  }

  shiftNodeDown(node) {
    if (node) {
      if (
        (node.left || node.right) &&
        (node.priority < node.left.priority ||
          (node.right && node.priority < node.right.priority))
      ) {
        let shiftNode;
        if (!node.right && node.left.priority > node.priority) {
          shiftNode = node.left;
          this.parentNodes.pop();
          this.parentNodes.shift();
          this.parentNodes.push(node);
          this.parentNodes.unshift(shiftNode);
        } else {
          if (node.left.priority > node.right.priority) {
            shiftNode = node.left;
          } else {
            shiftNode = node.right;
          }
          if (!shiftNode.right) {
            let shiftNodeIndex = this.parentNodes.indexOf(shiftNode);
            this.parentNodes.splice(shiftNodeIndex, 1);
            this.parentNodes.splice(shiftNodeIndex, 0, node);
          }
        }
        if (this.root === node) {
          this.root = shiftNode;
        }
        shiftNode.swapWithParent();
        this.shiftNodeDown(node);
      }
    }
  }
}

module.exports = MaxHeap;
