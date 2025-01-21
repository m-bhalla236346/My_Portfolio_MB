// Import Firestore from your Firebase config and Firestore methods
import { db } from './firebaseConfig.js';  
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

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

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    try {
        // Add data to Firestore collection 'contact_queries'
        await addDoc(collection(db, 'contact_queries'), {
            name: name,
            email: email,
            message: message,
            timestamp: serverTimestamp()  // Store timestamp
        });

        // Alert user and reset form
        alert('Your query has been submitted!');
        contactForm.reset();
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('There was an error submitting your query. Please try again.');
    }
});
