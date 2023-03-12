import React from "react";
import BigSquare from "./square";
import GameInfo from "./infoblock";
import './game.css'

class Game extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         history: [{
            squares: Array(9).fill(null),
         }],
         step: 0,
         xisNext: true,
      }
   }
   clickHandler(i){
      console.log(this.state.xisNext);
      const history = this.state.history.slice(0, this.state.step+1);
      const current = history[history.length-1];
      const squares = current.squares.slice();

      if (calculateWinner(squares).status_game || squares[i]) {
         return;
      }

      squares[i] = this.state.xisNext ? 'X' : 'O';

      this.setState({
         history: history.concat([{
            squares: squares,
         }]),
         step: history.length,
         xisNext: !this.state.xisNext,
      });
   }

   PlayNow(){
      this.setState({
         history: [{
            squares: Array(9).fill(null),
         }],
         step: 0,
         xisNext: true,
      })
   }

   StepBack(step){
      this.setState({
         step: step,
         xisNext: (step % 2) === 0,
      });
   }

   render(){

      const history = this.state.history;
      const current = history[this.state.step];
      const winner = calculateWinner(current.squares);

      let status;
      console.log(winner)
      if (winner.status_game == 'X' || winner.status_game == 'O') {
         status = 'Выиграл ' + winner.status_game;
      }else if(winner.status_game === '='){
         status = 'Не чия!';
      } else {
         status = 'Следующий ход: ' + (this.state.xisNext ? 'X' : 'O');
      }

      return(
         <div className="main-block-game">
            <div className="main-block-game__title">
               <div className="main-block-game__title-text">
                  Игра "Крестики Нолики"
               </div>
            </div>
            <div className="main-block-game__game">
               <BigSquare 
               squares={this.state.history[this.state.step].squares} 
               onClick={(i) => this.clickHandler(i)}
               addAnimation={winner.list_val ? winner.list_val : []}
               />
            </div>
            <div className="main-block-game__game-info">
               <GameInfo 
               status={status}
               play_now={() => this.PlayNow()}
               back={() => this.StepBack(this.state.step - 1)}/>
            </div>
         </div>
      )
   }
}

export default Game;


function calculateWinner(squares) {
   let is_full = false;
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];
   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
         return {list_val: lines[i], status_game: squares[a]};
      }
   }
   if (squares.filter(e => e==null).length == 0){
      return {list_val: [0, 1, 2, 3, 4, 5, 6, 7, 8], status_game: '='};
   }
   return {list_val: null, status_game: null};
}