const LinkedList = require("./key-value-list");

class Hashmap {
  constructor() {
    this.capacity = 16;
    this.array = Array.from({ length: this.capacity }, () => new LinkedList());
    this.loadFactor = 0.75;
    this.totalSize = 0;
  }

  hash(key) {
    let hash = 5381;

    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) ^ key.charCodeAt(i);
    }

    return (hash >>> 0) % this.capacity;
  }

  getBucket(key) {
    return this.array[this.hash(key)];
  }

  set(key, value) {
    const currentHashList = this.getBucket(key);
    const index = currentHashList.findKey(key);

    if (index !== null) {
      currentHashList.updateValue(index, value);
    } else {
      this.totalSize++;
      currentHashList.append(key, value);
      this.checkSize();
    }
  }

  get(key) {
    const currentHashList = this.getBucket(key);
    const index = currentHashList.findKey(key);

    if (typeof index === "number") {
      return currentHashList.at(index).value;
    }
    return null;
  }

  has(key) {
    const currentHashList = this.getBucket(key);
    return currentHashList.containsKey(key);
  }

  remove(key) {
    const currentHashList = this.getBucket(key);
    const index = currentHashList.findKey(key);

    if (index != null) {
      this.totalSize--;
    }

    return currentHashList.removeAt(index);
  }

  length() {
    return this.totalSize;
  }

  clear() {
    this.array = Array.from({ length: this.capacity }, () => new LinkedList());
    this.totalSize = 0;
  }

  keys() {
    return this.array.flatMap((bucket) => bucket.getAllKeys());
  }

  values() {
    return this.array.flatMap((bucket) => bucket.getAllValues());
  }

  entries() {
    return this.array.flatMap((bucket) => bucket.getAllKeyValuePairs());
  }

  doubleSize() {
    const allEntries = this.entries();
    this.capacity *= 2;
    this.clear();

    allEntries.forEach((entry) => {
      const [key, value] = entry;
      this.set(key, value);
    });
  }

  checkSize() {
    if (this.totalSize === this.capacity * this.loadFactor) {
      this.doubleSize();
    }
  }
}

let test = new Hashmap();

// for (let i = 0; i < 24; i++) {
//   let temp = "key" + i;
//   test.set(temp, i);
// }

// console.log(test);
// console.log(test.entries());
