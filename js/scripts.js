// Import Firestore from your Firebase config and Firestore methods
import { db } from './firebaseConfig.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

// Check if the script is loaded
console.log('scripts.js loaded');

// Register the service worker (ensure it's only done in supported browsers)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

// Get form elements
const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Ensure the form is selected
if (!contactForm) {
    console.error('Form not found. Ensure #contact-form exists in the HTML.');
} else {
    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submission event triggered');

        // Collect form data
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }

        try {
            // Add data to Firestore collection 'contact_queries'
            const docRef = await addDoc(collection(db, 'contact_queries'), {
                name,
                email,
                message,
                timestamp: serverTimestamp()
            });
            console.log('Document written with ID: ', docRef.id);
            alert('Your query has been submitted!');
            contactForm.reset();
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('There was an error submitting your query. Please try again.');
        }
    });
}
