// 构建一个有10个节点的二叉树，每个节点的值为0-280
var nodes = [];
for (var i = 0; i < 10; i++) {
    nodes.push(Math.floor(Math.random() * 281));
}
var binaryTree = new BinaryTree();
nodes.forEach(function (value) {
    binaryTree.insert(value);
});

// 前序遍历二叉树，把二叉树的所有节点都存入一个数组中
var nodesForAlien = [];

var callback = function (nodes) {
    nodesForAlien.push(nodes);
};

binaryTree.preOrderTraverse(callback);

// 随机选择数组中的一个节点，将它的值作为外星人的横坐标
var alienNodeSelect = Math.floor(Math.random() * 9);

nodesForAlien[alienNodeSelect].selected = true;

var alienX = nodesForAlien[alienNodeSelect].key;

var alienY = 20,
    guessX = 0,
    guessY = 0,
    shotRemaining = 8,
    shotMade = 0,
    gameState = '',
    gameWon = false;

var cannon = document.querySelector('#cannon'),
    alien = document.querySelector('#alien'),
    missile = document.querySelector('#missile'),
    explosion = document.querySelector('#explosion'),
    inputX = document.querySelector('#inputX'),
    inputY = document.querySelector('#inputY'),
    output = document.querySelector('#output'),
    button = document.querySelector('button');

button.style.cursor = 'pointer';
button.addEventListener('click',clickHandler,false);
// 第三个参数true为事件捕获（由上而下），false为事件冒泡（由下而上）
window.addEventListener('keydown',keydownHandler,false);

function clickHandler() {
    validateInput();
}

function keydownHandler() {
    if (event.keyCode === 13) {
        validateInput();
    }
}

function validateInput() {
    guessX = parseInt(inputX.value);
    // 如果参数为数字或只含数字的字符串，parseInt()返回对应数字，否则返回NaN
    guessY = parseInt(inputY.value);

    if (isNaN(guessX) || isNaN(guessY)) {
        output.innerHTML = '请输入坐标: ';
    }else if (guessX > 300 || guessY > 300) {
        output.innerHTML = '坐标值不能大于300！';
    }else {
        playGame();
    }
}

function playGame() {
    shotRemaining--;  // 剩余炮弹数量
    shotMade++;  // 发射炮弹数量
    gameState = '炮弹数量：' + shotRemaining;

    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);

    var alienNode = binaryTree.search(guessX);

    if (alienNode && alienNode.selected) {
        if ((guessY >= alienY) && (guessY <= (alienY + 20))) {
            gameWon = true;
            endGame();
        }
    }else {
        output.innerHTML = '没有击中！<br/>' + gameState;
        if (shotRemaining < 1) {
            endGame();
        }
    }

    if (!gameWon) {
        // 重新设定外星人的坐标
        nodesForAlien[alienNodeSelect].selected = false;
        alienNodeSelect = Math.floor(Math.random() * 9);
        nodesForAlien[alienNodeSelect].selected = true;
        alienX = nodesForAlien[alienNodeSelect].key;
        alienY += 30;
    }

    // 重新绘制页面
    render();

    console.log('X: ' + alienX);
    console.log('Y: ' + alienY);
}

function render() {
    alien.style.left = alienX + 'px';
    alien.style.top = alienY + 'px';
    cannon.style.left = guessX + 'px';
    missile.style.left = guessX + 'px';
    missile.style.top = guessY + 'px';

    if (gameWon) {
        explosion.style.display = 'block';
        explosion.style.left = guessX + 'px';
        explosion.style.top = guessY + 'px';

        alien.style.display = 'none';
        missile.style.display = 'none';
    }
}

function endGame() {
    if (gameWon) {
        output.innerHTML = "Hit! 你拯救了地球~" + "<br>" + "你发射了炮弹" + shotMade + "枚";
    }else {
        output.innerHTML = "失败了！" + "<br>" + "地球被外星人侵略！";
    }

    // 移除事件绑定
    button.removeEventListener("click", clickHandler, false);
    button.disabled = true;

    window.removeEventListener("keydown", keydownHandler, false);
    inputX.disabled = true;
    inputY.disabled = true;
}