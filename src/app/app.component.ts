import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  matrixSize = 6;
  matrix = [];
  totalMines = 0;
  totalScore = 0;

  constructor() {
    this.drawMatrix();
  }

  drawMatrix() {
    for (let i = 0; i < this.matrixSize; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.matrixSize; j++) {
        // this.matrix[i][j] = {position: i + '' + j, mines: Math.round(Math.random()) !== 1 ? Math.floor(Math.random() * 5) + 1 : 0};
        this.matrix[i][j] = {position: this.totalMines, mines: Math.round(Math.random())};
      }
    }
  }


  getMineDetails(i, j, mines) {
    this.totalMines = 0;
    // RULE 1 (i - 1, j)
    // RULE 2 (i + 1, j)
    // RULE 3 (i, j - 1)
    // RULE 4 (i, j + 1)

    // RULE 5 (i - 1, j - 1)
    // RULE 6 (i + 1, j + 1)
    // RULE 7 (i - 1, j + 1)
    // RULE 8 (i + 1, j - 1)

    if (!mines) {
      this.totalMines += Math.sign(i - 1) !== - 1 ? this.matrix[i - 1][j].mines : 0;
      this.totalMines += (i + 1) < this.matrixSize  ? this.matrix[i + 1][j].mines : 0;
      this.totalMines += Math.sign(j - 1) !== - 1 ? this.matrix[i][j - 1].mines : 0;
      this.totalMines += (j + 1) < this.matrixSize  ? this.matrix[i][j + 1].mines : 0;

      this.totalMines += ((Math.sign(i - 1) !== - 1) && (Math.sign(j - 1) !== - 1)) ? this.matrix[i - 1][j - 1].mines : 0;
      this.totalMines += (((i + 1) < this.matrixSize) && ((j + 1) < this.matrixSize)) ? this.matrix[i + 1][j + 1].mines : 0;
      this.totalMines += ((Math.sign(i - 1) !== - 1) && ((j + 1) < this.matrixSize)) ? this.matrix[i - 1][j + 1].mines : 0;
      this.totalMines += (((i + 1) < this.matrixSize) && (Math.sign(j - 1) !== - 1)) ? this.matrix[i + 1][j - 1].mines : 0;

      this.matrix[i][j].position = this.totalMines;
      this.totalScore += 10;
    } else {
      alert("You lost the game.. " + mines + " mine(s) in the current cell." );
      this.resetGame();
    }
  }

  resetGame() {
    this.matrix = [];
    this.totalScore = 0;
    this.totalMines = 0;
    this.drawMatrix();
  }

}
