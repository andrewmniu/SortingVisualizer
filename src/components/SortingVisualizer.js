import React from "react";
import Controls from "./Controls.js";
import { bubbleSort } from "../algorithms/bubbleSort.js";
import { insertionSort } from "../algorithms/insertionSort.js";
import { selectionSort } from "../algorithms/selectionSort.js";
import { mergeSort } from "../algorithms/mergeSort.js";
import { heapSort } from "../algorithms/heapSort.js";
import { quickSort } from "../algorithms/quickSort.js";

// animation colors
const colors = {
  unsorted: "#2C75FF", // blue
  compare: "#FEFF37", // yellow
  swap: "#fd5e53", // red
  sorted: "#79d70f", // green
};

class SortingVisualizer extends React.Component {
  state = {
    array: [],
    inverse: 0, // percentage of 1/size, used to scale bar elements
    algorithm: "quick",
    sorted: false,
    sorting: false,
  };

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
    const bars = document.getElementsByClassName("bar");
    if (this.state.sorted) {
      for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = colors.unsorted;
      }
    }
    this.setState({ array, inverse: 100 * (1 / size), sorted: false });
    // this.setState(test);
  };

  // does not update state of array, only css styling
  sort = () => {
    this.setState({ sorting: true });
    let speed = undefined; //speed of animation, lower value indicates faster animation
    const bars = document.getElementsByClassName("bar");
    const [finishTime, sortedArray] = this.runAlgorithm(
      [...this.state.array],
      speed,
      bars,
      colors
    );
    // paints the sorted array green once the animation of sorting is done
    for (let i = finishTime; i < finishTime + this.state.array.length; i++) {
      setTimeout(() => {
        bars[i - finishTime].style.backgroundColor = colors.sorted;
      }, finishTime + (1500 / this.state.array.length) * (i - finishTime));
    }
    setTimeout(() => {
      this.setState({ array: sortedArray, sorting: false, sorted: true });
    }, finishTime + (1500 / this.state.array.length) * this.state.array.length);
  };

  // chooses the algorithm to run based on algorithm this.state
  // speed is determined by an arbitrary constant and the algorithm's asymptotic run time
  runAlgorithm = (arr, speed, bars) => {
    switch (this.state.algorithm) {
      case "bubble":
        speed = 9000 / arr.length ** 2;
        return bubbleSort(arr, speed, bars, colors);
      case "selection":
        speed = 6500 / arr.length ** 2;
        return selectionSort(arr, speed, bars, colors);
      case "insertion":
        speed = 12500 / arr.length ** 2;
        return insertionSort(arr, speed, bars, colors);
      case "merge":
        speed = 5000 / (arr.length * Math.log2(arr.length));
        // speed = 500;
        return mergeSort(arr, speed, bars, colors);
      case "heap":
        speed = speed = 3000 / (arr.length * Math.log2(arr.length));
        return heapSort(arr, speed, bars, colors);
      case "quick":
        speed = 4000 / (arr.length * Math.log2(arr.length));
        return quickSort(arr, speed, bars, colors);
      default:
        console.log("error");
        break;
    }
  };

  choose = (e) => {
    if (this.state.sorted) {
      this.resetArray(this.state.array.length);
    }
    this.setState({ algorithm: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <Controls
          algorithm={this.state.algorithm}
          array={this.state.array}
          sorting={this.state.sorting}
          sorted={this.state.sorted}
          resetArray={this.resetArray}
          sort={this.sort}
          choose={this.choose}
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
