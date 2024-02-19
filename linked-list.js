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
      newNode.next = this.headNode.next;
      this.headNode.next = newNode;
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

    let newLast = this.at(this.nodeSize - 1);
    this.tailNode = newLast;
    this.tailNode.next = null;
  }

  contains(value) {
    let current = this.headNode;

    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
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

// let test = new Node();
// let newList = new LinkedList();
// newList.append(1);
// newList.append(2);
// newList.append(4);
// newList.append(5);
// newList.append(6);
// newList.pop();
// console.log(newList.find(77));
// console.log(newList.contains(6));

// console.log(newList.toString());
