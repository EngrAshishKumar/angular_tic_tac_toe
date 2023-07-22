import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  squares: any[];
  xIsNext: boolean ;
  winner: string;
  moves: number;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.squares = new Array(9).fill(null);
    this.xIsNext = true;
    this.winner = "";
    this.moves = 0;
  }

  get player(){
    return this.xIsNext ? "X" : "O";
  }

  makeMove(index: number){
    if(this.squares[index] == null ){
      // this.squares.splice(index, 1, this.player);
      this.squares[index] = this.player;
      this.xIsNext = !this.xIsNext;
      this.moves += 1;
    }
    // minimum 4 moves require
    if(this.moves > 4 && this.moves <= 9 ){
      this.winner = this.determineWinner();
    }

    if(this.moves == 9 && !this.winner){
      console.log("Tied");
    }
    if(this.winner){
      console.log(this.winner);
    }
  }

  determineWinner(){
    // This array contains the lines which determines winner like if index 0,1,2 are same then we get winner 
    // or like if 2,4,6 are X then X is winner 
    const winningLine = [[0, 1, 2], // horizontal lines
                         [3, 4, 5],
                         [6, 7, 8],
                         [0, 3, 6], // vertical lines
                         [1, 4, 7],
                         [2, 5, 8],
                         [0, 4, 8], // diagonal lines
                         [2, 4, 6]]

    for(let i = 0; i < winningLine.length; i++ ){
      const [a, b, c] = winningLine[i];

      if( this.squares[a] && this.squares[a] == this.squares[b] && this.squares[b] == this.squares[c]){
        return this.squares[a];
      }
    }
    return null;
  }
  
}
