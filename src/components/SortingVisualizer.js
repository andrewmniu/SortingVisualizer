import React from "react";
import PropTypes from "prop-types";
import Controls from "./Controls.js";
import { testSort } from "../algorithms/testSort.js";
import { bubbleSort } from "../algorithms/bubbleSort.js";
import { insertionSort } from "../algorithms/insertionSort.js";
import { selectionSort } from "../algorithms/selectionSort.js";

// animation colors
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
      inverse: 0, // percentae of 1/size, used to scale bar elements
    };
  }

  barStyle = (value, idx) => {
    return {
      position: "absolute",
      backgroundColor: colors.unsorted,
      height: `${value / 11}%`, // gives a little space at top of container
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

  // generates a random array
  resetArray = (size) => {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(randomInt(5, 1000));
    }
    this.setState({ array, inverse: 100 * (1 / size) });
  };

  // resets array and repaints to unsorted
  newArray = (size) => {
    this.resetArray(size);
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = colors.unsorted;
    }
  };

  // sort = () => {
  //   const unsorted = this.state.array;
  //   this.setState({ array: selectionSort(this.state.array) });
  //   testSort(unsorted, this.state.array);
  // };

  sort = () => {
    let speed = undefined; //speed of animation, lower value indicates faster animation
    const bars = document.getElementsByClassName("bar");
    const unsorted = this.state.array;
    let finishTime = undefined;
    switch (this.state.algorithm) {
      case "bubble":
        speed = 9000 / this.state.array.length ** 2;
        finishTime = bubbleSort(this.state.array, speed, bars, colors);
        break;
      case "insertion":
        speed = 12500 / this.state.array.length ** 2;
        finishTime = insertionSort(this.state.array, speed, bars, colors);
        break;
      case "selection":
        speed = 11000 / this.state.array.length ** 2;
        finishTime = selectionSort(this.state.array, speed, bars, colors);
        break;
      default:
        console.log("error");
        break;
    }
    testSort(unsorted, this.state.array);
    // paints the sorted array green once the animation of sorting is done
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
