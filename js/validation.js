function submitForm(event) {
    event.preventDefault();

    

    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const email = document.getElementById('email').value.trim();
    const city = document.getElementById('city').value.trim();
    const role = document.querySelector('input[name="role"]:checked');
    const clinicAddress = document.getElementById('clinic-address').value.trim();

    const nameRegex = /^[A-Za-z\s]+$/;
    const contactRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!nameRegex.test(name)) {
        alert('Please enter a valid name (letters and spaces only).');
        return;
    }

    // Contact validation
    if (!contactRegex.test(contact)) {
        alert('Please enter a valid 10-digit contact number starting with 6-9.');
        return;
    }

    // Email validation
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // City validation
    if (city === '') {
        alert('Please enter your city.');
        return;
    }

    // Role selection validation
    if (!role) {
        alert('Please select whether you are a doctor or a patient.');
        return;
    }

    // Clinic address validation if Doctor is selected
    if (role.value === 'doctor' && clinicAddress === '') {
        alert('Please enter the clinic address.');
        return;
    }

    // If all validations pass
    alert('Form submitted successfully!');
    // Optionally: here, you can add code to send data to Firebase or your server
}
