import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxZtjzCnkgsgQpbsTCQLwO5armrJZ4l_Y",
    authDomain: "mydermaweb.firebaseapp.com",
    projectId: "mydermaweb",
    storageBucket: "mydermaweb.firebasestorage.app",
    messagingSenderId: "423831952259",
    appId: "1:423831952259:web:591c11381c08f04af174b6",
    measurementId: "G-9X488MQK5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit Form Function
async function submitForm(event) {
    event.preventDefault();

    console.log("Form Submitted!");

    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    const city = document.getElementById("city").value;
    const roleRadio = document.querySelector('input[name="role"]:checked');

    if (!roleRadio) {
        alert("Please select your role (Doctor or Patient).");
        return;
    }

    const role = roleRadio.value;
    const clinicAddress = document.getElementById("clinic-address").value || null;

    const formData = {
        name,
        contact,
        email,
        city,
        role,
        clinicAddress: role === "doctor" ? clinicAddress : null,
        timestamp: new Date()
    };

    try {
        const collectionName = role === "doctor" ? "doctors" : "patients";
        await addDoc(collection(db, collectionName), formData);

        alert("✅ Data submitted successfully!");
        document.getElementById("contact-form").reset();
        toggleForm("patient"); // Reset view
    } catch (error) {
        console.error("❌ Error adding document: ", error);
        alert("❌ Failed to submit data.");
    }
}

// Toggle Clinic Address Function
function toggleForm(role) {
    const clinicAddressGroup = document.getElementById("clinic-address-group");
    const clinicAddressInput = document.getElementById("clinic-address");

    if (role === "doctor") {
        clinicAddressGroup.style.display = "block";
        clinicAddressInput.required = true;
    } else {
        clinicAddressGroup.style.display = "none";
        clinicAddressInput.required = false;
    }
}

// Expose functions to global window scope for HTML event handlers
window.submitForm = submitForm;
window.toggleForm = toggleForm;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set default state for doctor/patient radio buttons
    toggleForm('patient');
});

// Export db for use in admin.js
export { db };