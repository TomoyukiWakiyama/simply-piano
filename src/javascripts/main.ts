import "../stylesheets/main.scss";
import Piano from "./piano";

const p1 = new Piano("aaa");
p1.autoPlayHandler();
p1.keyboardHandler();
// function twinkle(val) {
// return new Promise(function (resolve) {
// setTimeout(function () {
// console.log(val);
// resolve(val);
// }, 1000);
// });
// }

// async function init() {
// let val = await twinkle("do");
// val = await twinkle("");
// }

// init();
