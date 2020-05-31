import React from "react";
import PropTypes from "prop-types";
import SortingVisualizer from "./components/SortingVisualizer.js";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SortingVisualizer></SortingVisualizer>
      </div>
    );
  }
}

export default App;
