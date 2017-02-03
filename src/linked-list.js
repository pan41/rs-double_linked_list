const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        var node = new Node(data);

        if (this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }

        this.length++;

        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    find(index) {
        var currentNode = this._head;
        var length = this.length;
        var count = 0;

        if(length == 0 || index > length){
            return false;
        }

        while (count < index){
            currentNode = currentNode.next;
            count++;
        }

        return currentNode;
    }

    at(index) {
        var currentNode = this.find(index);

        return currentNode.data;
    }

    insertAt(index, data) {
        var currentNode = this.find(index);
        var prevNode = currentNode.prev;
        if(index < this.length) {
            var node = new Node(data);

            node.prev = currentNode.prev;
            node.next = currentNode;
            currentNode.prev = node;
            prevNode.next = node;
            currentNode = node;  
        }
        return this;
    }

    isEmpty() {
            return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if(index < this.length){
            var node = this._head;
            var i = 0;

            while(i < index){
                node = node.next;
                i++;
            }

            while (i != this.length -1){
                node.data = node.next.data;
                this._tail = node;
                node = node.next;
                i++;
            }
            node.data = null;
            node.next = null;
            this.length--;
        }
        return this;
    }

    reverse() {
        var node_buf = {
            data: null,
            next: null,
            prev: null,
        }

        var node_head = this._head;
        var node_tail = this._tail;

        var i = 0;

        while (i < Math.floor(this.length / 2)) { 
            node_buf.data = node_tail.data;
            node_tail.data = node_head.data;
            node_head.data = node_buf.data;
            node_head = node_head.next;
            node_tail = node_tail.prev;
            i++;
        }

        return this;
    }

    indexOf(data) {
        var currentNode = this._head;
        var i = 0;
        while(currentNode !== null) {
          if (currentNode.data === data) {
            return i;
          } else {
            currentNode = currentNode.next;
            i++;
          }
        }
        return -1;
    }
}

module.exports = LinkedList;
