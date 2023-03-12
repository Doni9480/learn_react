import React from "react";
import './infoblock.css'

class GameInfo extends React.Component{
   render(){
      return(
         <div className="game-info">
            <div className="game-info__staus">{this.props.status}</div>
            <div className="game-info__start-now-btn" onClick={this.props.play_now}><span>Играть с начало!</span></div>
            <div className="game-info__back-btn" onClick={this.props.back}><span>Назад</span></div>
         </div>
      )
   }
}
export default GameInfo;