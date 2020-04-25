let wwidth = window.innerWidth;
let wheight = window.innerHeight;

let sceen = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, wwidth/wheight, 0.1, 100);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(wwidth, wheight);

document.body.appendChild(renderer.domElement);