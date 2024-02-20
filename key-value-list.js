class Node {
  constructor(key = null, value = null, next = null) {
    this.key = key;
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

  append(key, value) {
    if (!this.headNode) {
      this.prepend(key, value);
    } else {
      this.nodeSize++;

      const newNode = new Node(key, value, null);
      this.tailNode.next = newNode;
      this.tailNode = newNode;
    }
  }

  prepend(key, value) {
    this.nodeSize++;
    const newNode = new Node(key, value, null);

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
      return null;
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

  findKey(key) {
    let index = 0;

    let current = this.headNode;

    while (current) {
      if (current.key === key) {
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

  containsKey(key) {
    return this.findKey(key) !== null;
  }

  updateValue(index, newValue) {
    const updateNode = this.at(index);
    updateNode.value = newValue;
  }

  insertAt(key, value, index) {
    if (index > this.nodeSize) {
      return "Invalid index";
    }
    this.nodeSize++;
    if (index === 0) {
      this.prepend(key, value);
    } else {
      const newNode = new Node(key, value, null);

      const nodeBefore = this.at(index - 1);
      const nodeAfter = this.at(index);

      newNode.next = nodeAfter;
      nodeBefore.next = newNode;
    }
  }

  removeAt(index) {
    if (!index || index > this.nodeSize - 1) {
      console.log("false bitch");
      return false;
    }
    if (index === this.nodeSize - 1) {
      this.pop();
    } else if (index === 0) {
      this.headNode = this.headNode.next;
    } else {
      const nodeBefore = this.at(index - 1);
      const removeNode = this.at(index);
      console.log(nodeBefore);
      nodeBefore.next = removeNode.next;
    }
    return true;
  }

  getAllKeys() {
    let keysArray = [];
    let current = this.headNode;

    while (current) {
      keysArray.push(current.key);
      current = current.next;
    }
    return keysArray;
  }

  getAllValues() {
    let valuesArray = [];
    let current = this.headNode;

    while (current) {
      valuesArray.push(current.value);
      current = current.next;
    }
    return valuesArray;
  }

  getAllKeyValuePairs() {
    let keyValuePairs = [];
    let current = this.headNode;

    while (current) {
      keyValuePairs.push([current.key, current.value]);
      current = current.next;
    }
    return keyValuePairs;
  }

  toString() {
    let current = this.headNode;
    let resultString = "";

    while (current) {
      resultString += `( key:${current.key} value:${current.value} ) -> `;
      current = current.next;
    }
    resultString += "null";

    return resultString;
  }
}

module.exports = LinkedList;

let newList = new LinkedList();
// newList.append(1,1);
// newList.append(1,2);
// newList.append(4,4);
// newList.append(5,1);
// newList.append(6,2);
// newList.append(7,20);
// newList.prepend(55,2);
// newList.updateValue(2, 67777)

// console.log(newList.toString());

