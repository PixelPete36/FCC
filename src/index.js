import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { marked } from "marked";

class Appp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textinput:
        " # This is header one \n## This is header two\nThis is code `<div></div>` by wrapping in backticks \nUse triple quotes for block code, for example: \n```\nfunction addTwo(num) {\n  return num + 2;\n}\n```\nHere's a link [links](https://www.freecodecamp.org) to FCC  \n**bold text** \n>block quotes baby! \n1) and you \n2) can make \n3) lists!!! \nOne last shout out to FCC ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)",
    };
  }
  // load the text after startup.
  componentDidMount() {
    marked.use({
      breaks: true,
    });
    document.querySelector("#preview").innerHTML = marked(this.state.textinput);
  }

  textChange = (event) => {
    this.setState({ textinput: event.target.value }, () => {
      document.querySelector("#preview").innerHTML = marked(
        this.state.textinput
      );
    });
  };

  expandPreviewer = () => {
    document.querySelector("#editorContainer").classList.toggle("hide");
    document.querySelector("#preview").classList.toggle("minHeight");
  };

  expandEditor = () => {
    document.querySelector("#previewerContainer").classList.toggle("hide");
    document.querySelector("#editor").classList.toggle("minHeight");
  };

  render() {
    return (
      <div id="page">
        <Editor
          toggleExpand={this.expandEditor}
          handleChange={this.textChange}
          text={this.state.textinput}
        />
        <Previewer
          toggleExpand={this.expandPreviewer}
          outputValue={this.state.textinput}
        />
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <div id="editorContainer">
      <div id="header">
        <div>
          (<i className="fa-solid fa-fire fa"></i>) <b>Editor</b>
        </div>{" "}
        <i
          onClick={props.toggleExpand}
          id="expandEditor"
          className="fa-solid fa-maximize expand"
        ></i>
      </div>
      <textarea
        id="editor"
        value={props.text}
        onChange={props.handleChange}
      ></textarea>
    </div>
  );
};

const Previewer = (props) => {
  return (
    <div id="previewerContainer">
      <div id="header">
        <div>
          (<i className="fa-solid fa-fire fa"></i>) <b>Previewer</b>
        </div>
        <i
          onClick={props.toggleExpand}
          id="expandPreviewer"
          className="fa-solid fa-maximize expand"
        ></i>
      </div>
      <div id="preview"></div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Appp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
