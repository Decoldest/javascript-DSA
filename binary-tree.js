class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    let temp = Array.from(new Set(array));
    temp.sort(function (a, b) {
      return a - b;
    });

    return createBST(temp, 0, temp.length - 1);

    //Recursively create the balanced search tree
    function createBST(array, start, end) {
      if (start > end) return null;
      let middle = Math.floor((start + end) / 2);
      let newNode = new Node(array[middle]);

      newNode.left = createBST(array, start, middle - 1);
      newNode.right = createBST(array, middle + 1, end);

      return newNode;
    }
  }

  insert(value) {
    let currentNode = this.root;
    let newNode = new Node(value);

    if (!currentNode) {
      this.root = newNode;
      return;
    }

    while (currentNode.right || currentNode.left) {
      if (value < currentNode.data && currentNode.left) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data && currentNode.right) {
        currentNode = currentNode.right;
      } else {
        break;
      }
    }

    if (value < currentNode.data) {
      currentNode.left = newNode;
    } else {
      currentNode.right = newNode;
    }
  }

  delete(value, node = this.root) {
    let currentNode = node;
    let previousNode = null;

    while (currentNode && currentNode.data != value) {
      previousNode = currentNode;
      currentNode =
        value < currentNode.data ? currentNode.left : currentNode.right;
    }

    if (!currentNode) return;

    if (!currentNode.left && !currentNode.right) {
      if (currentNode != this.root) {
        if (previousNode.left == currentNode) {
          previousNode.left = null;
        } else {
          previousNode.right = null;
        }
      } else {
        this.root = null;
      }
    } else if (currentNode.left && currentNode.right) {
      let successor = this.findMinimum(currentNode.right);
      let tempValue = successor.value;
      this.delete(tempValue);
      currentNode.data = tempValue;
    } else {
      let child = currentNode.left ? currentNode.left : currentNode.right;

      if (currentNode != this.root) {
        if (currentNode == previousNode.left) {
          previousNode.left = child;
        } else {
          previousNode.right = child;
        }
      } else {
        this.root = child;
      }
    }
  }

  findMinimum(node) {
    let temp = node;
    while (temp.left) {
      temp = temp.left;
    }
    return temp;
  }

  find(value, currentNode = this.root) {
    if (!currentNode || currentNode.data === value) {
      return currentNode;
    }
    if (value < currentNode.data) {
      return this.find(value, currentNode.left);
    }
    return this.find(value, currentNode.right);
  }

  levelOrder(callback) {
    if (!this.root) {
      return;
    }
    let result = typeof callback == "undefined" ? [] : null;
    let queue = [];
    queue.push(this.root);
    while (queue.length) {
      let currentNode = queue.shift();

      if (typeof callback !== "undefined") {
        callback(currentNode);
      } else {
        result.push(currentNode.data);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return result;
  }

  inOrder(callback, currentNode = this.root, result = []) {
    if (!currentNode) {
      return;
    }
    this.inOrder(callback, currentNode.left, result);
    if (typeof callback !== "undefined") {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }
    this.inOrder(callback, currentNode.right, result);

    return result;
  }

  preOrder(callback, currentNode = this.root, result = []) {
    if (!currentNode) {
      return;
    }

    if (typeof callback !== "undefined") {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }
    this.preOrder(callback, currentNode.left, result);
    this.preOrder(callback, currentNode.right, result);

    return result.length ? result : null;
  }

  postOrder(callback, currentNode = this.root, result = []) {
    if (!currentNode) {
      return;
    }

    this.postOrder(callback, currentNode.left, result);
    this.postOrder(callback, currentNode.right, result);
    if (typeof callback !== "undefined") {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }

    return result.length ? result : null;
  }

  height(node) {
    if (!node) {
      return 0;
    }
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node) {
    return this.height(this.root) - this.height(node);
  }

  isBalanced(node = this.root) {
    if (!node) {
      return true;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    let currentNodeBalance = Math.abs(leftHeight - rightHeight) <= 1;

    return (
      currentNodeBalance &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    if (!this.isBalanced()) {
      const newArray = this.inOrder();
      this.root = this.buildTree(newArray);
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const init = () => {
  const array = [];

  for (let index = 0; index < 20; index++) {
    array.push(Math.floor(Math.random() * 100));
  }
  const tree = new Tree(array);

  prettyPrint(tree.root);

  console.log("Is the tree balanced?", tree.isBalanced());
  console.log("Level order, pre order, post order, and in order");
  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());

  for (let index = 0; index < 10; index++) {
    tree.insert(Math.floor(Math.random() * 200) + 100);
  }
  prettyPrint(tree.root);
  console.log("Is the tree balanced after adding?", tree.isBalanced());
  console.log("Rebalance");
  tree.rebalance();
  prettyPrint(tree.root);
  console.log("Is the tree balanced after rebalancing?", tree.isBalanced());
  console.log("Level order, pre order, post order, and in order");
  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());
};

init();

// const test = new Tree([
//   1, 4, 67, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 6,
// ]);

// const ex = (node) => console.log(node.data);

// prettyPrint(test.root);

// test.insert(55);
// test.insert(29);
// prettyPrint(test.root);

// test.rebalance();
// prettyPrint(test.root);
