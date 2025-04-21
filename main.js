// Import Three.js core
import * as THREE from 'three';
// Import OrbitControls addon
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- Basic Setup ---
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- Orbit Controls ---
// Pass the camera and the canvas element (renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smoother feeling interaction
controls.dampingFactor = 0.05; // Adjust damping effect
// controls.autoRotate = true; // Uncomment for auto-rotation effect
// controls.autoRotateSpeed = 0.5; // Adjust auto-rotation speed


// --- Texture Loading ---
const textureLoader = new THREE.TextureLoader();
const electricTexture = textureLoader.load('electric.jpg',
    () => { console.log('Texture loaded'); },
    undefined,
    (err) => { console.error('Error loading texture:', err); }
);

// --- Scene Content ---
const geometry = new THREE.PlaneGeometry(4, 4);
const material = new THREE.MeshBasicMaterial({
    map: electricTexture,
    side: THREE.DoubleSide
});
const planeMesh = new THREE.Mesh(geometry, material);
scene.add(planeMesh);

// Lights (Still here, useful if you switch to MeshStandardMaterial)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);


// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    // *** IMPORTANT: Update controls ***
    // Required if enableDamping or autoRotate is set to true
    controls.update();

    // --- REMOVED Automatic Rotation ---
    // planeMesh.rotation.x += 0.005; // No longer needed - user controls rotation
    // planeMesh.rotation.y += 0.005; // No longer needed

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

console.log("Three.js setup complete. Drag to rotate, scroll to zoom.");

