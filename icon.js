// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

// 3. Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
