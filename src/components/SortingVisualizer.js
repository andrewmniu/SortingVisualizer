import React from "react";
import PropTypes from "prop-types";
import "./SortingVisualizer.css";
import { testSort } from "../algorithms/testSort.js";
import { bubbleSort } from "../algorithms/bubbleSort.js";

const colors = {
  unsorted: "#2C75FF",
  compare: "#FEFF37",
  swap: "#fd5e53",
  sorted: "#79d70f",
};

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      inverse: 0,
    };
  }

  barStyle = (value, idx) => {
    return {
      position: "absolute",
      backgroundColor: colors.unsorted,
      height: `${value / 10}%`,
      width: `${this.state.inverse}%`,
      borderRight: `${this.state.inverse}px solid #292B2D`,
      left: `${idx * this.state.inverse}%`,
      bottom: "0",
      float: "left",
      marginBottom: "0",
    };
  };

  componentDidMount() {
    this.resetArray(100);
  }

  resetArray = (size) => {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(randomInt(5, 1000));
    }
    this.setState({ array, inverse: 100 * (1 / size) });
  };

  newArray = (size) => {
    this.resetArray(size);
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = colors.unsorted;
    }
  };

  sort = () => {
    const SPEED = 12500 / this.state.array.length ** 2;
    const bars = document.getElementsByClassName("bar");
    const unsorted = this.state.array;
    const finishTime = bubbleSort(this.state.array, SPEED, bars, colors);
    testSort(unsorted, this.state.array);
    for (let i = finishTime; i < finishTime + this.state.array.length; i++) {
      setTimeout(() => {
        console.log(finishTime);
        bars[i - finishTime].style.backgroundColor = colors.sorted;
      }, finishTime + (1500 / this.state.array.length) * (i - finishTime));
    }
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="btn"
          onClick={() => this.newArray(this.state.array.length)}
        >
          Generate new array
        </button>
        <button className="btn" onClick={this.sort}>
          Sort
        </button>
        <div>
          <input
            type="range"
            id="size"
            name="size"
            min="5"
            max="300"
            step="1"
            value={this.state.array.length}
            onInput={(e) => {
              this.newArray(e.target.value);
            }}
          />
        </div>
        <div className="container">
          {this.state.array.map((value, idx) => (
            <div
              className="bar"
              key={idx}
              style={this.barStyle(value, idx)}
            ></div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
