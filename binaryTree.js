function BinaryTree() {

    function Node(key) {
        this.key = key;
        this.left = null;  // left和right是Node的实例化对象
        this.right = null;
        this.selected = false;
    }

    var root = null;

    var insertNode = function (node,newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            }else {
                insertNode(node.left,newNode);
            }
        }else {
            if (node.right === null) {
                node.right = newNode;
            }else {
                insertNode(node.right,newNode);
            }
        }
    };

    // 中序遍历，把二叉树从小到大的打印出来
    var inOrderTraverseNode = function (node,callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left,callback);
            callback(node.key);
            inOrderTraverseNode(node.right,callback);
        }
    };

    // 前序遍历
    var preOrderTraverseNode = function (node,callback) {
        if (node !== null) {
            callback(node);
            preOrderTraverseNode(node.left,callback);
            preOrderTraverseNode(node.right,callback);
        }
    };

    // 后序遍历 （通常用于遍历文件夹）
    var postOrderTraverseNode = function (node,callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left,callback);
            postOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    };

    // 查找最小值
    // 递归算法
    var minNode = function (node) {
        if (node === null) {
            return null;
        }
        if (node.left === null) {
            return node.key;
        }else {
            return minNode(node.left);
        }
    };
    // 循环算法
    /*var minNode = function (node) {
        if (node) {
            while (node.left) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    };*/

    var maxNode = function (node) {
        if (node) {
            if (node.right) {
                return maxNode(node.right);
            }else {
                return node.key;
            }
        }
        return null;
    };

    var searchNode = function (node,key) {
        if (node === null) {
            return null;
        }
        if (node.key > key) {
            return searchNode(node.left,key);
        }else if (node.key < key) {
            return searchNode(node.right,key);
        }else {
            return node;
        }
    };

    var findMinNode = function (node) {
        if (node) {
            while (node.left) {
                node = node.left;
            }
            return node;
        }
        return null;
    };

    // 删除节点
    var removeNode = function (node,key) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            node.left = removeNode(node.left,key);
            return node;
        }else if (key > node.key) {
            node.right = removeNode(node.right,key);
            return node;
        }else {
            // 当节点为叶子节点时
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // 当节点的左子树或右子树为空时
            if (node.left === null) {
                node = node.right;
                return node;
            }else if (node.right === null) {
                node = node.left;
                return node;
            }
            // 当节点的左右子树都不为空时
            var aux = findMinNode(node.right);
            node.key = aux.key;
            node.right = removeNode(node.right,aux.key);
            return node;
        }
    };

    // 生成二叉树接口
    this.insert = function (key) {
        var newNode = new Node(key);
        if (root === null) {
            root = newNode;
        }else {
            insertNode(root,newNode);
        }
    };

    // 中序遍历二叉树接口
    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root,callback);
    };

    // 前序遍历二叉树接口
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root,callback);
    };

    // 后序遍历二叉树接口
    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(root,callback);
    };

    // 查找二叉树的最小值接口
    this.min = function () {
        return minNode(root);
    };

    // 查找二叉树的最大值接口
    this.max = function () {
        return maxNode(root);
    };

    // 查找一个数值是否属于二叉树
    this.search = function (key) {
        return searchNode(root,key);
    };

    // 删除叶子节点
    this.remove = function (key) {
        root = removeNode(root,key);
    };
}