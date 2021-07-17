import React from "react";

import {Main} from "./main";
import ReactDOM from "react-dom";

console.log('Hello this is the index');

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Main/>, document.getElementById("root"));
});
