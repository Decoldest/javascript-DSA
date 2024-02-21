class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.nodeSize = 0;
    this.headNode = null;
    this.tailNode = null;
  }

  append(value) {
    if (!this.headNode) {
      this.prepend(value);
    } else {
      this.nodeSize++;

      const newNode = new Node(value, null);
      this.tailNode.next = newNode;
      this.tailNode = newNode;
    }
  }

  prepend(value) {
    this.nodeSize++;
    const newNode = new Node(value, null);

    if (!this.headNode) {
      this.headNode = newNode;
      this.tailNode = newNode;
    } else {
      newNode.next = this.headNode;
      this.headNode = newNode;
    }
  }

  size() {
    return this.nodeSize;
  }

  head() {
    return this.headNode;
  }

  tail() {
    return this.headNode;
  }

  at(index) {
    if (!this.headNode || index > this.nodeSize) {
      return -1;
    }

    let temp = this.headNode;

    for (let i = 0; i < index; i++) {
      temp = temp.next;
    }

    return temp;
  }

  pop() {
    this.nodeSize--;

    if (!this.nodeSize) {
      this.headNode = null;
      this.tailNode = null;
    } else {
      let newLast = this.at(this.nodeSize - 1);
      this.tailNode = newLast;
      this.tailNode.next = null;
    }
  }

  find(value) {
    let index = 0;

    let current = this.headNode;

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return null;
  }

  contains(value) {
    return this.find(value) !== null;
  }

  insertAt(value, index) {
    if (index > this.nodeSize) {
      return "Invalid index";
    }
    this.nodeSize++;
    if (index === 0) {
      this.prepend(value);
    } else {
      const newNode = new Node(value, null);

      const nodeBefore = this.at(index - 1);
      const nodeAfter = this.at(index);

      newNode.next = nodeAfter;
      nodeBefore.next = newNode;
    }
  }

  removeAt(index) {
    if (index === null || index > this.nodeSize - 1) {
      return false;
    }
    if (index === this.nodeSize - 1) {
      this.pop();
    } else if (index === 0) {
      this.headNode = this.headNode.next;
      this.nodeSize--;
    } else {
      const nodeBefore = this.at(index - 1);
      const removeNode = this.at(index);
      nodeBefore.next = removeNode.next;
      this.nodeSize--;
    }
    return true;
  }

  toString() {
    let current = this.headNode;
    let resultString = "";

    while (current) {
      resultString += `( ${current.value} ) -> `;
      current = current.next;
    }
    resultString += "null";

    return resultString;
  }
}

let test = new Node();
let newList = new LinkedList();

newList.append(1);

console.log(newList.toString());
newList.removeAt(0);
console.log(newList.toString());
console.log(newList.nodeSize);
// newList.append(6);
// newList.append(7);
// newList.insertAt(999, 2);
// console.log(newList.toString());

// console.log(newList.size());

// newList.removeAt(6);

// console.log(newList.toString());
