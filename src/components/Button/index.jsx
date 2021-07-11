import React, { Component } from 'react'
import './styles.css';

export class Button extends Component {
  render() {
  const { text, onClick } = this.props;
    return (
        <button className="button" onClick={onClick}>{text}</button>
    )
  }
}

export default Button;
