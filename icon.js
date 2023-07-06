// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
/*const camera = new THREE.PerspectiveCamera(
  100,
  1,
  0.1,
  1000
);
camera.position.z = 1;
*/

// Calculate width and height of the view
const width = 5;  // Halved the width of the viewport
const height = width * (window.innerHeight / window.innerWidth);  // Calculate the height of the viewport to maintain aspect ratio

// OrthographicCamera
const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);

camera.position.z = 2;

// 3. Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(50, 50);

const iconContainer = document.querySelector('#iconContainer');
iconContainer.appendChild(renderer.domElement);

// 4. Geometry
const geometry = new THREE.ConeGeometry(0.5, 1, 4);

// 5. Material
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Color set to green

// 6. Mesh (Object)
const pyramid = new THREE.Mesh(geometry, material);
scene.add(pyramid);

function animate() {
  requestAnimationFrame(animate);
  pyramid.rotation.x += 0.01;
  pyramid.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
