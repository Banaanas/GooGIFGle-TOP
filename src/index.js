// Import core.js
import "core-js";
import "regenerator-runtime/runtime";
// Import stylesheets
import "./styles/index.css";
import "./styles/normalize.css";
// Import error icon
import errorIcon from "./images/error.jpg";
// Random Words NPM library
const randomWords = require("random-words");

// Select img DOM
const imageGif = document.querySelector("img");

// Init Page Gif Function
const initPageGif = async () => {
  const initRandomWord = randomWords();
  const initGif = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=v1gBLxTmDjjqtOKz5KYJ8vEpDNdkanzT&s=${initRandomWord}`,
    {
      mode: "cors",
    },
  );
  const gifLinkObject = await initGif.json();
  imageGif.src = gifLinkObject.data.images.original.url;
};
// Execute Init Page Gif Function
initPageGif();

// Add Event Listener to the Change Gif Button
const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const buttonRandomWord = randomWords();
  const buttonGif = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=v1gBLxTmDjjqtOKz5KYJ8vEpDNdkanzT&s=${buttonRandomWord}`,
    {
      mode: "cors",
    },
  );
  const response = await buttonGif.json();
  imageGif.src = response.data.images.original.url;
});

// Implement the Gif Search Function
const searchInput = document.querySelector("#search-box");
searchInput.addEventListener("keyup", async (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    const searchBoxValue = searchInput.value;

    try {
      const searchedGif = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=v1gBLxTmDjjqtOKz5KYJ8vEpDNdkanzT&s=${searchBoxValue}`,
        {
          mode: "cors",
        },
      );
      const response = await searchedGif.json();
      imageGif.src = response.data.images.original.url;
    } catch (error) {
      imageGif.src = errorIcon;
    }

    searchInput.value = "";
    searchInput.placeholder = "Search a Gif ...";
  }
});
