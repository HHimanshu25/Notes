import { renderLogin } from "./auth/login.js";
import { renderNotes } from "./notes/note.js";

const app = document.getElementById("app");

// check login state
// function init() {
//   const token = localStorage.getItem("token");

//   if (token) {
//     renderNotes(app);
//   } else {
//     renderLogin(app);
//   }
// }

// // start app
// init();

// renderNotes(app)
renderLogin(app)