//connection of database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAiBEcF_n2ghNkQxTXAiDLSYkrMlppE8gk",
    authDomain: "dermaceuticalweb.firebaseapp.com",
    projectId: "dermaceuticalweb",
    storageBucket: "dermaceuticalweb.firebasestorage.app",
    messagingSenderId: "88766004277",
    appId: "1:88766004277:web:e62c456f72b82d7f58c57c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

 window.submitForm= async function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted!");

    // Collect form data
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    const city = document.getElementById("city").value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const clinicAddress = document.getElementById("clinic-address").value || null;

    const formData = {
        name,
        contact,
        email,
        city,
        role,
        clinicAddress: role === "doctor" ? clinicAddress : null
    };

    try {
        const collectionName = role === "doctor" ? "doctors" : "patients";
        await addDoc(collection(db, collectionName), formData);

        alert("Data submitted successfully!");
        document.getElementById("contact-form").reset();
        toggleForm("patient");
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to submit data.");
    }
}

// Toggle form fields based on role
 window.toggleForm= function(role) {
    console.log("toggle submitted!");
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
