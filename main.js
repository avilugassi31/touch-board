'use strict'
console.log('touch board game');

var gBoard = [];
var gCurrNum;
var gTimer;

function init(num) {
    gBoard = buildNumArr(num);
    gCurrNum = gBoard[0];
    renderBoard(gBoard);

}
// var startTime = Date.now();
// function timer() {
//     var elapsedTime = Date.now() - startTime;
//     document.querySelector('.safeTimerDisplay').innerHTML = (elapsedTime / 1000).toFixed(3);
// }

function cellClicked(elBtn) {
    var sec = 1;
    if (elBtn.innerText === '1') {

        gTimer = setInterval(function () {
            var time = new Date(sec * 1000).toString().split(':');
            var currTime = time[1] + ':' + time[2].split(' ')[0];
            document.querySelector('.timer-display').innerHTML = currTime;
            sec++;
        }, 1000);
    }

    var value = +(elBtn.innerText);
    console.log({ value, gCurrNum });
    if (value === gCurrNum) {
        elBtn.style.backgroundColor = 'green';
        gBoard.shift();
        gCurrNum = gBoard[0];
    }
    // if (gCurrNum === gBoard[gBoard.length]) {
    if (!gBoard.length) {
        clearInterval(gTimer);
        // alert('game over');
        var msg = document.querySelector('.timer-display');
        msg.innerHTML = 'Your Time Is' + ' ' + msg.innerText;
    }
}

function renderBoard(numArr) {
    var maxRuns = Math.sqrt(numArr.length)
    var counter = 0;
    var strHtml = '';
    var shuffledArr = shuffle(numArr.slice());

    for (var i = 0; i < maxRuns; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < maxRuns; j++) {
            strHtml += `<td class="number" onclick ="cellClicked(this)" >${shuffledArr[counter]} </td>`
            counter++
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
    console.log(elBoard)

}

function buildNumArr(num) {
    var maxNums = num * num;
    var nums = [];
    for (var i = 0; i < maxNums; i++) {
        nums.push(i + 1);


    }
    return nums
}


function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)

}