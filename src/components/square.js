import React from "react";
import './square.css'

class MiniSquare extends React.Component{
   render(){
      return(
         <div 
         className={this.props.addAnimation.length & this.props.addAnimation.filter(i => i == this.props.index_val).length ? "square__item animation" : "square__item"} 
         onClick={() => this.props.onClick(this.props.index_val)}>
            <span>{this.props.squares[this.props.index_val]}</span>
         </div>
      )
   }
}

class BigSquare extends React.Component {

   render (){
      const ind = [0,1,2,3,4,5,6,7,8];
      return (
         <div className="square__body">
            {ind.map((i) => <MiniSquare index_val={i} squares={this.props.squares} onClick={this.props.onClick} addAnimation={this.props.addAnimation} key={i}/>)}
         </div>
      )}
}

export default BigSquare;