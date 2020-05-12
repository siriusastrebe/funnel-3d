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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
camera.position.set(0, 0, 10);

var geometry = new THREE.ParametricGeometry( funnelParametric, 250, 250 );
var material = new THREE.MeshPhysicalMaterial( { color: 0x88ff88 } );
var funnel = new THREE.Mesh( geometry, material );
funnel.castShadow = true; //default is false
funnel.receiveShadow = false; //default

scene.add(funnel);

const light = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add(light);

const light2 = new THREE.DirectionalLight( 0xff8888, 3 );
light2.position.set(0,1,1);
light2.castShadow = true;
light2.target = funnel;

scene.add(light2);
const helper = new THREE.DirectionalLightHelper( light2, 5 );
scene.add(helper);



const container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);

renderer.setSize(width , height);

var controls = new OrbitControls(camera, renderer.domElement);
controls.update();

renderer.render(scene, camera);

var lightRotation = 0.0;
animate();
function animate() {
  lightRotation += 0.01
  light2.position.set(0, Math.sin(lightRotation) * 10, Math.cos(lightRotation) * 10);

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
