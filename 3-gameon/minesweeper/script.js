"use strict";

function Minesweeper(id){
    this.rootId = document.getElementById(id);
    this.GameWidth = 15;
    this.PictureWidth = 25;
    this.board, this.numberOfMines, this.mines, this.turnedImages, this.markedImages, this.gameOver, this.timerClock;

    this.initGame();
}
Minesweeper.prototype.initGame = function(){
    this.rootId.innerHTML = '';
    this.gameOver = false;
    this.board = [];
    this.numberOfMines = Math.floor(this.GameWidth*this.GameWidth *0.25);
    this.mines = [];
    this.turnedImages = 0;
    this.markedImages = 0;
    this.drawGame();
    this.calculateMines();
};

Minesweeper.prototype.drawGame = function(){
    var that = this;
    var i;

    function clicked(e){
        e.preventDefault();
        if(that.gameOver === false) {
            var offsetX = Math.floor((e.pageX - this.offsetLeft) / that.PictureWidth);
            var offsetY = Math.floor((e.pageY - this.offsetTop) / that.PictureWidth);
            if (that.isTurned(offsetY, offsetX) === false) {
                if (e.which === 3) {
                    if(that.isMarked(offsetY, offsetX) === false) {
                        that.setMarker(offsetY, offsetX);
                    }else if(that.isMarked(offsetY, offsetX) === true) {
                        that.removeMarker(offsetY, offsetX);
                    }
                } else {
                    if (that.hasMine(offsetY, offsetX)) {
                        that.mines.forEach(function (mine) {
                            that.setImage(mine[0], mine[1], "images/bomb.png");
                        });
                        that.setImage(offsetY, offsetX, "images/bombred.png");
                        clearTimeout(that.timerClock);
                        that.gameOver = true;
                    } else if (that.hasNeighborMines(offsetY, offsetX) > 0) {
                        that.turnImage(offsetY, offsetX);
                        that.setImage(offsetY, offsetX, "images/" + that.hasNeighborMines(offsetY, offsetX) + ".png");
                        that.turnedImages++;
                    } else {
                        that.revealZeros(offsetY, offsetX);
                    }
                }
                bombsLeft.innerHTML = that.numberOfMines - that.markedImages;
                if (that.markedImages + that.turnedImages >= that.GameWidth * that.GameWidth && that.markedImages === that.numberOfMines) {
                    alert('Congratz!');
                }
            }
        }
    }

    var gameArea = document.createElement("div");
    this.rootId.style.width = this.GameWidth * this.PictureWidth + "px";
    gameArea.style.width = this.GameWidth * this.PictureWidth + "px";
    gameArea.onclick = clicked;
    gameArea.addEventListener('contextmenu', clicked);

    var header = document.createElement("header");

    var newButton = document.createElement("button");
    newButton.innerHTML = "New Game";
    newButton.onclick = function(){
        that.initGame();
    };

    var bombsLeft = document.createElement("div");
    bombsLeft.className = "bombsLeft";
    bombsLeft.innerHTML = this.numberOfMines;

    var clock = document.createElement("div");
    clock.className = "timer";
    clock.innerHTML = 0;
    var time = 1;
    this.timerClock = setInterval(function(){
        clock.innerHTML = time;
        time++;
    }, 1000);

    header.appendChild(bombsLeft);
    header.appendChild(newButton);
    header.appendChild(clock);
    this.rootId.appendChild(header);
    this.rootId.appendChild(gameArea);

    for(i = 0; i < this.GameWidth; i++){
        var row = document.createElement("div");
        row.className = "row";

        var imageArray = [];

        for(var j = 0; j < this.GameWidth; j++){
            var img = document.createElement("img");
            img.src = "images/standard.png";
            row.appendChild(img);
            imageArray.push({
                image: img,
                mine: false,
                turned: false,
                marked: false
            });
        }
        this.board.push({
            rowDiv: row,
            rowArray: imageArray
        });
        gameArea.appendChild(row);
    }

};

Minesweeper.prototype.calculateMines = function(){
    for(var i = 0; i < this.numberOfMines; i++){
        var mineRow = Math.floor((Math.random() * this.GameWidth));
        var mineCol = Math.floor((Math.random() * this.GameWidth));

        if(this.hasMine(mineRow, mineCol) === false){
            this.setMine(mineRow, mineCol);
            this.mines.push([mineRow, mineCol]);
        }else{
            i--;
        }
    }
};

Minesweeper.prototype.revealZeros = function(row, col) {

    if(row >= this.GameWidth || row < 0 || col >= this.GameWidth || col < 0 || this.isTurned(row, col) === true || this.hasMine(row,col)) {
        return;
    }
    this.turnImage(row, col);
    this.turnedImages++;
    if(this.hasNeighborMines(row, col) > 0){
        this.setImage(row, col, "images/" + this.hasNeighborMines(row, col) + ".png");
        return;
    }
    this.setImage(row, col, "images/empty.png");
    this.revealZeros(row-1, col);
    this.revealZeros(row-1, col+1);
    this.revealZeros(row-1, col-1);
    this.revealZeros(row+1, col);
    this.revealZeros(row+1, col+1);
    this.revealZeros(row+1, col-1);
    this.revealZeros(row, col-1);
    this.revealZeros(row, col+1);

};

Minesweeper.prototype.isMarked = function(row, col) {
    return this.board[row].rowArray[col].marked;
};

Minesweeper.prototype.setMarker = function(row, col) {
    this.board[row].rowArray[col].marked = true;
    if(this.markedImages < this.numberOfMines) {
        this.markedImages++;
        this.setImage(row, col, "images/img2.png");
    }
};

Minesweeper.prototype.removeMarker = function(row, col) {
    this.board[row].rowArray[col].marked = false;
    if(this.markedImages > 0) {
        this.markedImages--;
        this.setImage(row, col, "images/standard.png");
    }
};

Minesweeper.prototype.hasMine = function(row, col){
    return this.board[row].rowArray[col].mine;
};
Minesweeper.prototype.isTurned = function(row, col) {
    return this.board[row].rowArray[col].turned;
};

Minesweeper.prototype.turnImage = function(row, col){
    if(this.isMarked(row,col)){
        this.removeMarker(row,col);
    }
    this.board[row].rowArray[col].turned = true;
};
Minesweeper.prototype.setImage = function(row, col, imagePath){
    this.board[row].rowArray[col].image.src = imagePath;
};
Minesweeper.prototype.setMine = function(row, col){
    this.board[row].rowArray[col].mine = true;
};
Minesweeper.prototype.hasNeighborMines = function(row, col){
    var count = 0, i, j;
    for(i = row-1; i <= row+1; i++){
        for(j = col-1; j <= col+1; j++){
            if((i < this.GameWidth && i >= 0) && (j < this.GameWidth && j >= 0)){
                if(this.hasMine(i, j)){
                    count++;
                }
            }
        }
    }
    return count;
};

new Minesweeper("test1");