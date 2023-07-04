import * as THREE from 'three';

function createPyramidGeometry(size, height) {
    let geometry = new THREE.Geometry();

    // Create the vertices of the pyramid
    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(size, 0, 0),
        new THREE.Vector3(size, size, 0),
        new THREE.Vector3(0, size, 0),
        new THREE.Vector3(size / 2, size / 2, height)
    );

    // Create the faces of the pyramid
    geometry.faces.push(
        new THREE.Face3(0, 1, 4),
        new THREE.Face3(1, 2, 4),
        new THREE.Face3(2, 3, 4),
        new THREE.Face3(3, 0, 4),
        new THREE.Face3(1, 0, 3),
        new THREE.Face3(3, 2, 1)
    );

    geometry.computeFaceNormals();
    
    return geometry;
}

function createIcon() {
    const geometry = createPyramidGeometry(1, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const icon = new THREE.Mesh(geometry, material);
    
    return icon;
}

// Code for setting up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 50 / 50, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha true for transparent background

renderer.setSize(50, 50);
document.querySelector('#iconContainer').appendChild(renderer.domElement);

// Create the pyramid icon and add it to the scene
const icon = createIcon();
scene.add(icon);

// Move the camera out so you can see the icon
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
