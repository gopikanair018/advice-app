import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = { advice: "" };

  componentDidMount() {
    this.fetchAdvice()
  }
  //class method - function inside a class - method means function belongs to a class

  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const {advice}=response.data.slip
        // {}- object
        //property : value = same names(advice)=advice
        this.setState({advice})
        console.log(advice);
      })
      .catch((error) => {
        console.log(error); 
      });
  };
  render() {
    const {advice}=this.state 
    return (
        <div className="app">
            <div className="card">
                <h1 className="heading>">
                    {advice}
                </h1>
                <button className="button" onClick={this.fetchAdvice}>
                    <span>give me advice!</span>
                </button>
            </div>

        </div>
    )
  }
}
export default App;
