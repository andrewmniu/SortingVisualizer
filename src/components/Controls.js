import React from "react";
import PropTypes from "prop-types";

class Controls extends React.Component {
  // onClick={() => this.newArray(this.props.array.length)}
  render() {
    return (
      <header id="controlbar">
        <button
          className="control"
          onClick={this.props.newArray.bind(this, this.props.array.length)}
        >
          Randomize
        </button>
        <button className="control" onClick={this.props.sort}>
          Sort
        </button>
        <select
          value={this.props.algorithm}
          id="algorithms"
          className="control"
          onChange={this.props.choose}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="heap">Heap Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
        <div id="slidecontainer" className="control">
          <label htmlFor="size">Size:</label>
          <input
            type="range"
            id="size"
            className="slider"
            name="size"
            min="5"
            max="300"
            step="1"
            value={this.props.array.length}
            onChange={(e) => {
              this.props.newArray(e.target.value);
            }}
          />
        </div>
      </header>
    );
  }
}

Controls.propTypes = {
  array: PropTypes.array.isRequired,
  algorithm: PropTypes.string.isRequired,
  newArray: PropTypes.func.isRequired,
  sort: PropTypes.func.isRequired,
  choose: PropTypes.func.isRequired,
};

export default Controls;
