import { React, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [guesses, setGuesses] = useState([]);
  let RiTa = require("rita");
  let rhymes = RiTa.rhymes("believe");
  let data = RiTa.analyze("elephant capitalism");
  let words = ["elephant", "postpone", "vestibule", "clinician", "orangutan"];

  let library = {};
  let answers = [];

  words.map((e) => {
    library[e] = RiTa.analyze(e).stresses;
  });

  const clickHandler = (e) => {
    e.target.style.color = "red";
    setGuesses([...guesses, e.target.textContent]);
  };

  let temp = "";
  let answer = "";

  for (const [key, value] of Object.entries(library)) {
    // console.log(key + " : " + value);
    if (value !== temp) {
      temp = "";
      temp = value;
      console.log(temp);
    } else {
      answer = value;
    }
  }

  const guessHandler = (e) => {
    // alert("guess!");
    e.preventDefault();
    if (library[e.target.textContent] === answer) {
      console.log("correct!");
    } else {
      console.log("wrong!");
    }
  };

  console.log("ANSWER: " + answer);

  return (
    <div className="App">
      <h1>Rita Practice</h1>
      <p>Here's a list of words. Pick the words with matching stress:</p>{" "}
      <ul>
        {words.map((e) => {
          return <button onClick={clickHandler}>{e}</button>;
        })}
      </ul>
      <p style={{ backgroundColor: "#ccc", padding: "5px" }}>
        <b>Guesses: </b>{" "}
        {guesses.map((e) => {
          return <p style={{ margin: "30px" }}>{e}</p>;
        })}
      </p>
      <button onClick={guessHandler}>Submit answer</button>
    </div>
  );
}
