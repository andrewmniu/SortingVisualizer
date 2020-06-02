import React from "react";
import PropTypes from "prop-types";
import Controls from "./Controls.js";
import { testSort } from "../algorithms/testSort.js";
import { bubbleSort } from "../algorithms/bubbleSort.js";
import {
  insertionSortAnimations,
  insertionSort,
} from "../algorithms/insertionSort.js";

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
      algorithm: "insertion",
      inverse: 0,
    };
  }

  barStyle = (value, idx) => {
    return {
      position: "absolute",
      backgroundColor: colors.unsorted,
      height: `${value / 11}%`,
      width: `${this.state.inverse}%`,
      borderRight: `${this.state.inverse}px solid #F2BD93`,
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

  // sort = () => {
  //   const unsorted = this.state.array;
  //   this.setState({array: insertionSortAnimations(this.state.array)})
  //   testSort(unsorted, this.state.array);
  //
  // };

  sort = () => {
    let SPEED = undefined;
    const bars = document.getElementsByClassName("bar");
    const unsorted = this.state.array;
    let finishTime = undefined;
    switch (this.state.algorithm) {
      case "bubble":
        SPEED = 12500 / this.state.array.length ** 2;
        finishTime = bubbleSort(this.state.array, SPEED, bars, colors);
        break;
      case "insertion":
        SPEED = 12000 / this.state.array.length ** 2;
        finishTime = insertionSort(this.state.array, SPEED, bars, colors);
        break;
    }
    testSort(unsorted, this.state.array);
    for (let i = finishTime; i < finishTime + this.state.array.length; i++) {
      setTimeout(() => {
        bars[i - finishTime].style.backgroundColor = colors.sorted;
      }, finishTime + (1500 / this.state.array.length) * (i - finishTime));
    }
  };

  render() {
    return (
      <React.Fragment>
        <Controls
          algorithm={this.state.algorithm}
          array={this.state.array}
          newArray={this.newArray}
          sort={this.sort}
          choose={(e) => this.setState({ algorithm: e.target.value })}
        ></Controls>
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
