import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import * as XLSX from "https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs";
import { db } from "./db.js";

// Admin Authentication Function
function authenticateAdmin() {
    console.log("Admin authentication started");
    const adminKey = "admin123";
    const enteredKey = prompt("🔑 Enter the admin key to download the file:");

    if (enteredKey === adminKey) {
        exportAllDataToExcel();
    } else {
        alert("❌ Invalid key! Access denied.");
    }
}

// Excel Export Function
async function exportAllDataToExcel() {
    try {
        // Show loading indicator or message
        const adminBtn = document.getElementById("admin-download");
        adminBtn.textContent = "📊 Preparing Excel...";
        adminBtn.disabled = true;
        
        console.log("Fetching data from Firestore...");
        
        // Fetch doctors data
        const doctorsSnapshot = await getDocs(collection(db, "doctors"));
        const doctorsData = [];
        doctorsSnapshot.forEach((doc) => {
            const data = doc.data();
            // Format timestamp for Excel
            if (data.timestamp && data.timestamp.toDate) {
                data.timestamp = data.timestamp.toDate().toISOString();
            }
            doctorsData.push({ id: doc.id, ...data });
        });

        console.log(`Found ${doctorsData.length} doctor records`);

        // Fetch patients data
        const patientsSnapshot = await getDocs(collection(db, "patients"));
        const patientsData = [];
        patientsSnapshot.forEach((doc) => {
            const data = doc.data();
            // Format timestamp for Excel
            if (data.timestamp && data.timestamp.toDate) {
                data.timestamp = data.timestamp.toDate().toISOString();
            }
            patientsData.push({ id: doc.id, ...data });
        });

        console.log(`Found ${patientsData.length} patient records`);

        // Create workbook and add sheets
        console.log("Creating Excel workbook...");
        const wb = XLSX.utils.book_new();

        if (doctorsData.length > 0) {
            const wsDoctors = XLSX.utils.json_to_sheet(doctorsData);
            XLSX.utils.book_append_sheet(wb, wsDoctors, "Doctors");
        }

        if (patientsData.length > 0) {
            const wsPatients = XLSX.utils.json_to_sheet(patientsData);
            XLSX.utils.book_append_sheet(wb, wsPatients, "Patients");
        }

        // Write and download the Excel file
        console.log("Downloading Excel file...");
        XLSX.writeFile(wb, "UserData.xlsx");
        
        // Reset button
        adminBtn.textContent = "📥 Admin Download";
        adminBtn.disabled = false;
        
        console.log("Excel file downloaded successfully");
        alert("✅ Excel file downloaded successfully!");
    } catch (error) {
        console.error("❌ Error exporting data: ", error);
        alert("❌ Failed to export data: " + error.message);
        
        // Reset button on error
        const adminBtn = document.getElementById("admin-download");
        adminBtn.textContent = "📥 Admin Download";
        adminBtn.disabled = false;
    }
}

// Add functions to global scope
console.log("Setting up admin-excel.js global functions");
window.authenticateAdmin = authenticateAdmin;
window.exportAllDataToExcel = exportAllDataToExcel;

// Add event listener to button when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("admin-excel.js: DOM loaded, setting up event listeners");
    const adminBtn = document.getElementById("admin-download");
    
    if (adminBtn) {
        console.log("Admin button found, adding event listener");
        // Make button visible - although we've set this in HTML now
        adminBtn.style.display = "inline-block";
        
        // Add click event listener
        adminBtn.addEventListener('click', (event) => {
            console.log("Admin button clicked");
            authenticateAdmin();
        });
    } else {
        console.error("Admin button not found in DOM");
    }
    
    // Debug check to verify global function exposure
    if (typeof window.authenticateAdmin === 'function') {
        console.log("authenticateAdmin successfully exposed to global scope");
    } else {
        console.error("authenticateAdmin not available in global scope");
    }
});