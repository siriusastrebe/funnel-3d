import * as THREE from 'THREE'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var width = window.innerWidth - 12;
var height = window.innerHeight - 100;



function funnelParametric(u, v, target) {
  var radians = v * Math.PI * 2;
  var x = u * Math.cos(radians);
  var y = u * Math.sin(radians);
  var z = 1/2 * Math.log(u);

  target.set( x, y, z );
}
/*
function paraFunction (a, b, target) {

  var x = -5 + 5 * a;
  var y = -5 + 5 * b;
  var z = (Math.sin(a * Math.PI) + Math.sin(b * Math.PI)) * -7;

  target.set( x, y, z );
}
*/

const renderer = new THREE.WebGLRenderer( { antialias: true } );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
camera.position.set(0, 0, 100);


var geometry = new THREE.ParametricGeometry( funnelParametric, 250, 250 );
var material = new THREE.MeshPhysicalMaterial( { color: 0x00ff00 } );
var klein = new THREE.Mesh( geometry, material );
scene.add( klein );

const light = new THREE.AmbientLight( 0xffffff, 0.8 );
scene.add(light);

const light2 = new THREE.DirectionalLight( 0xff8888, 5 );
scene.add(light2);

const container = document.createElement( 'div' );
document.body.appendChild( container );
container.appendChild( renderer.domElement );

renderer.setSize(width , height);

var controls = new OrbitControls( camera, renderer.domElement );
controls.update();

renderer.render( scene, camera );

animate();
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
