// Import the entire Three.js library
import * as THREE from 'three';

// --- Basic Setup ---

// Get the canvas element from HTML
const canvas = document.getElementById('three-canvas');

// Scene: Holds all objects, cameras, lights
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Set a background color

// Camera: Defines what we see
const camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near
    1000 // Far
);
camera.position.z = 5; // Move camera back

// Renderer: Draws the scene onto the canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// --- Texture Loading ---

// Create a texture loader
const textureLoader = new THREE.TextureLoader();

// Load the 'electric.jpg' image
// Make sure 'electric.jpg' is in the same folder as index.html!
const electricTexture = textureLoader.load('electric.jpg',
    // Optional: onLoad callback
    (texture) => {
        console.log('Texture loaded successfully');
        // You could adjust aspect ratio here if needed
        // planeMesh.scale.set(texture.image.width / 100, texture.image.height / 100, 1);
    },
    // Optional: onProgress callback (not typically needed for single textures)
    undefined,
    // Optional: onError callback
    (err) => {
        console.error('Error loading texture:', err);
    }
);

// --- Scene Content ---

// Geometry: Create a plane to display the texture
// PlaneGeometry(width, height)
const geometry = new THREE.PlaneGeometry(4, 4); // Adjust size as needed

// Material: Use MeshBasicMaterial for simple texture display (unaffected by lights)
// Set the 'map' property to our loaded texture
const material = new THREE.MeshBasicMaterial({
    map: electricTexture,
    side: THREE.DoubleSide // Render both sides of the plane
});

// Mesh: Combine Geometry and Material
const planeMesh = new THREE.Mesh(geometry, material);
scene.add(planeMesh); // Add the textured plane to the scene

// Lights (Still useful if you add other materials like MeshStandardMaterial)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);


// --- Animation Loop ---

function animate() {
    requestAnimationFrame(animate);

    // Animate the plane (make it rotate slowly)
    planeMesh.rotation.x += 0.005;
    planeMesh.rotation.y += 0.005;

    renderer.render(scene, camera);
}

// --- Handle Window Resizing ---

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener('resize', onWindowResize);

// --- Start Everything ---
animate();

console.log("Three.js setup complete. Should see a rotating plane with the electric.jpg texture.");

