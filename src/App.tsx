import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
      items: {},
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  // componentDidMount(){
  //   fetch('https://jsonplaceholder.typicode.com/users?id=1')
  //     .then(res => res.json())
  //     .then(
  //       // Success
  //       (result) => {
  //         this.state({
  //           isLoaded : true,
  //           resumeData : result.items
  //         });
  //       },
  //       // Error
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       },
  //     )
  // }

  // getResumeData() {
  //
  // }

  componentDidMount() {
    // this.getResumeData();
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users?id=1",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ items: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }


  render() {
    console.log(this.state.items[0])
    return (
      <div className="App">
        <Header data={this.state.items[0]} />
        <About data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <Contact data={this.state.resumeData.main} />
        <Footer data={this.state.resumeData.main} />
      </div>
    );
  }
}

export default App;
