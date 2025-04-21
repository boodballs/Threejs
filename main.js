// Import the entire Three.js library
import * as THREE from 'three';

// --- Basic Setup ---

// Get the canvas element from HTML
const canvas = document.getElementById('three-canvas');

// Scene: Holds all objects, cameras, lights
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Set a background color for the scene itself

// Camera: Defines what we see
// PerspectiveCamera(Field of View, Aspect Ratio, Near Clip Plane, Far Clip Plane)
const camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near
    1000 // Far
);
camera.position.z = 5; // Move camera back slightly so we can see the origin

// Renderer: Draws the scene onto the canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true // Smoother edges
});
// Set size initially
renderer.setSize(window.innerWidth, window.innerHeight);
// Match device pixel ratio for sharper rendering on high-DPI screens
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// --- Scene Content ---

// Geometry: Defines the shape (a box)
const geometry = new THREE.BoxGeometry(1, 1, 1); // Width, Height, Depth

// Material: Defines the appearance (basic blue color, requires light)
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });

// Mesh: Combines Geometry and Material
const cube = new THREE.Mesh(geometry, material);
scene.add(cube); // Add the cube to the scene

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1); // Position the light
scene.add(directionalLight);


// --- Animation Loop ---

function animate() {
    // Request the next frame
    requestAnimationFrame(animate);

    // Animate the cube (make it rotate)
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene from the camera's perspective
    renderer.render(scene, camera);
}

// --- Handle Window Resizing ---

function onWindowResize() {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // Apply the changes

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Update pixel ratio too
}

// Add event listener for resize
window.addEventListener('resize', onWindowResize);

// --- Start Everything ---
animate(); // Start the animation loop!

console.log("Three.js setup complete. Should see a rotating cube and the image.");
