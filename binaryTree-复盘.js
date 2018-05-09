// 平衡二叉树
function BinaryTree () {
	// 二叉树节点的结构
	function Node (key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
	
	root = null;
	
	// 插入一个新节点
	var insertNode = function (node,newNode) {
		if (key < node.key) {
			if (!node.left) {
				node.left = newNode;
			}else {
				insertNode(node.left,newNode);
			}
		}else {
			if (!node.right) {
				node.right = newNode;
			}else {
				insertNode(node.right,newNode);
			}
		}
	};
	
	// 生成二叉树
	this.insert = function (key) {
		var newNode = new Node (key);
		if (!root) {
			root = newNode;
		}else {
			insertNode(root,newNode);
		}
	};
	
	// 中序遍历
	var inOrderTraverseNode = function (node) {
		if (node) {
			inOrderTraverseNode(node.left);
			callback(node.key);
			inOrderTraverseNode(node.right);
		}
	}
	
	// 前序遍历
	var preOrderTraverseNode = function (node) {
		if (node) {
			callback(node.key);
			preOrderTraverseNode(node.left);
			preOrderTraverseNode(node.right);
		}
	}
	
	// 后序遍历
	var postOrderTraverseNode = function (node) {
		if (node) {
			postOrderTraverseNode(node.left);
			postOrderTraverseNode(node.right);
			callback(node.key);
		}
	}
	
	// 递归算法求最小值节点
	var minNode = function (node) {
		if (!node) {
			return null;
		}
		if (!node.left) {
			return node;
		}else {
			minNode(node.left);
		}
	}
	
	// 循环算法求最大值节点
	var maxNode = function (node) {
		if (!node) {
			return null;
		}
		while (node.right) {
			node = node.right;
		}
		return node;
	}
	
	// 查找给定值节点
	var searchNode = function (node,key) {
		if (!node) {
			return null;
		}
		if (key < node.key) {
			searchNode(node.left,key);
		}else if (key > node.key) {
			searchNode(node.right,key);
		}else {
			return node;
		}
	}
	
	// 删除给定值节点
	var removeNode = function (node,key) {
		if (!node) {
			return null;
		}
		if (key < node.key) {
			node.left = removeNode(node.left,key);
			return node;
		}else if (key > node.key) {
			node.right = removeNode(node.right,key);
			return node;
		}else {
			// 左右节点皆为空
			if (!node.left && !node.right) {
				node = null;
				return node;
			}
			// 左节点为空
			if (!node.left) {
				node = node.right;
				return node;
			}
			// 右节点为空
			if (!node.right) {
				node = node.left;
				return node;
			}
			// 左右节点皆不为空
			var aux = minNode(node.right);
			node.key = aux.key;
			node.right = removeNode(node.right,aux.key);
			return node;
		}
	}
}