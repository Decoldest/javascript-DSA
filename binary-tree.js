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
  console.log(temp);

    return createBST(temp, 0, temp.length - 1);

    function createBST(array, start, end) {
      if (start > end) return null;
      let middle = Math.floor((start + end) / 2);
      let newNode = new Node(array[middle]);

      newNode.left = createBST(array, start, middle - 1);
      newNode.right = createBST(array, middle + 1, end);

      return newNode;
    }
  }

  insert(value){
    let currentNode = this.root;
    let newNode = new Node(value);

    if (!currentNode) {
      this.root = newNode;
      return;
    }

    while (currentNode.right || currentNode.left) {
      currentNode = value < currentNode.data ? currentNode.left : currentNode.right;
    }

    if (value < currentNode.data) {
      currentNode.left = newNode;
    } else {
      currentNode.right = newNode;
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

const test = new Tree([
  1, 4, 67, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 6
]);

prettyPrint(test.root);
test.insert(20);
prettyPrint(test.root);


