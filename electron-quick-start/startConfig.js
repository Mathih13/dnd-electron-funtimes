// Debug mode. Gives better control and more access in the dev tools console when set to true.
const debug = true; 

















function start() {
    // Attach a script to the body.
    var script = document.createElement('script');
    document.body.appendChild(script);

    // "require" does not let us access variables
    // from the dev tools. if debug is true use src.
    if (debug == true) {
        script.src = 'renderer.js';
    } else {
        script.innerHTML = 'require("./renderer.js");';

    }
    
}
start();