/*const tests = [
    {name:"Fever Package - Advance", category:"Fever", includes:"Dengue, Malaria, Typhoid", report:"24–48 hrs", icon:"images/fever.png"},
    {name:"Diabetes Basic", category:"Diabetes", includes:"Fasting, Post Prandial", report:"12 hrs", icon:"images/diabetes.png"},
    {name:"Vitamin D & B12", category:"Vitamins", includes:"Vitamin D, B12", report:"24 hrs", icon:"images/vitamins.png"},
    {name:"Full Body Checkup", category:"Full Body", includes:"CBC, Sugar, Lipid, Kidney", report:"24 hrs", icon:"images/fullbody.png"},
    {name:"Men's Health", category:"Men", includes:"CBC, Liver, Kidney, Hormones", report:"24–48 hrs", icon:"images/men.png"},
    {name:"Women's Health", category:"Women", includes:"CBC, Thyroid, Hormones, Vitamin", report:"24–48 hrs", icon:"images/women.png"},
    {name:"Liver & Kidney", category:"Liver & Kidney", includes:"Liver, Kidney, Electrolytes", report:"24 hrs", icon:"images/liver.png"},
    {name:"Thyroid Package", category:"Thyroid", includes:"T3, T4, TSH", report:"12–24 hrs", icon:"images/thyroid.png"},
    {name:"Hormones Package", category:"Hormones", includes:"Estrogen, Progesterone, Testosterone, LH, FSH", report:"24–48 hrs", icon:"images/hormones.png"},
    {name:"Allergy Package", category:"Allergy", includes:"IgE, Specific Allergen Tests", report:"48 hrs", icon:"images/allergy.png"}
];

const categories = [...new Set(tests.map(t=>t.category))];
let expandedCategory = null;
let currentBookingTest = null;

function renderCategories(){
    const container = document.getElementById("horizontalCategories");
    container.innerHTML = "";
    categories.forEach(cat=>{
        const card = document.createElement("div");
        card.className="category-card";
        card.innerHTML=`<span>${cat}</span><i class="fa fa-chevron-down"></i>`;
        card.onclick = ()=>{
            if(expandedCategory===cat){
                document.getElementById("packageContainer").innerHTML="";
                card.classList.remove("active");
                expandedCategory=null;
            } else {
                document.querySelectorAll(".category-card").forEach(c=>c.classList.remove("active"));
                card.classList.add("active");
                showPackages(cat);
                expandedCategory=cat;
            }
        }
        container.appendChild(card);
    });
}

renderCategories();*/

// ====================
// Subcategories per category (1mg-style, embedded in JS)
// ====================
let activeCategory = null;

// Define subcategory data directly with emojis
const subCategoryData = {
    "Blood & CBC": [
        { name: "CBC Basic", includes: "Hemoglobin, WBC, Platelets", report: "12 hrs", price: "350", popular: true, icon: "🩸" },
        { name: "CBC Advanced", includes: "CBC + ESR + Peripheral Smear", report: "24 hrs", price: "550", popular: false, icon: "🩸" }
    ],
    "Liver": [
        { name: "Liver Function Test", includes: "SGPT, SGOT, Bilirubin", report: "24 hrs", price: "400", popular: true, icon: "❤️" },
        { name: "Advanced Liver Panel", includes: "LFT + ALP + GGT", report: "24–48 hrs", price: "700", popular: false, icon: "❤️" }
    ],
    "Kidney": [
        { name: "Kidney Function Test", includes: "Creatinine, Urea, Electrolytes", report: "24 hrs", price: "450", popular: true, icon: "🫘" }
    ],
    "Thyroid": [
        { name: "Thyroid Panel", includes: "TSH, T3, T4", report: "12–24 hrs", price: "500", popular: true, icon: "🦋" }
    ],
    "Diabetes": [
        { name: "Diabetes Check", includes: "Fasting, Post Prandial", report: "12 hrs", price: "400", popular: true, icon: "💉" },
        { name: "HbA1c Test", includes: "HbA1c", report: "24 hrs", price: "600", popular: false, icon: "💉" }
    ],
    "Lipid & Heart": [
        { name: "Lipid Profile", includes: "Cholesterol, LDL, HDL, Triglycerides", report: "24 hrs", price: "500", popular: true, icon: "💓" }
    ],
    "Vitamins": [
        { name: "Vitamin D & B12", includes: "Vitamin D, B12", report: "24 hrs", price: "600", popular: true, icon: "✨" }
    ],
    "Hormones": [
        { name: "Hormone Panel", includes: "Estrogen, Progesterone, Testosterone", report: "24–48 hrs", price: "1200", popular: true, icon: "⚡" }
    ],
    "Infections": [
        { name: "COVID-19 RT-PCR", includes: "SARS-CoV-2 Detection", report: "24 hrs", price: "800", popular: true, icon: "🛡️" },
        { name: "Dengue Test", includes: "NS1 + IgM/IgG", report: "24 hrs", price: "500", popular: false, icon: "🛡️" }
    ],
    "Cancer Markers": [
        { name: "PSA Test", includes: "Prostate Specific Antigen", report: "24 hrs", price: "600", popular: true, icon: "🔬" }
    ],
    "Urine & Stool": [
        { name: "Urine Routine", includes: "Physical, Chemical, Microscopy", report: "12 hrs", price: "300", popular: true, icon: "🧪" }
    ],
    "Allergy": [
        { name: "Allergy Panel", includes: "IgE, Specific Allergen Tests", report: "48 hrs", price: "1000", popular: false, icon: "🌿" }
    ],
    "Wellness Packages": [
        { name: "Basic Wellness Package", includes: "CBC, Sugar, Lipid", report: "24 hrs", price: "1200", popular: true, icon: "💊" }
    ]
};

// Flatten subCategoryData into single tests array
const tests = [];
for (let cat in subCategoryData) {
    subCategoryData[cat].forEach(test => {
        tests.push({
            name: test.name || "",
            category: cat,
            includes: test.includes || "",
            report: test.report || "",
            icon: test.icon || "🧪",
            price: test.price || "",
            popular: test.popular || false
        });
    });
}

function switchTab(tab) {
    const categorySection = document.getElementById("categorySection");
    const subSection = document.getElementById("subCategorySection");

    if (tab === 'cat') {
        const isVisible = categorySection.style.display === "block";

        if (isVisible) {
            // 👉 Hide everything
            categorySection.style.display = "none";
            subSection.style.display = "none";
            activeCategory = null;
        } else {
            categorySection.style.display = "block";

            window.scrollTo({
                top: categorySection.offsetTop - 80,
                behavior: "smooth"
            });
        }
    }
}

// =======================
// Show Packages for Category
// =======================
function showPackages(cat) {
    const container = document.getElementById("packageContainer");
    const list = tests.filter(t => t.category === cat);

    container.innerHTML = list.map(t => `
        <div class="package-card">
            <div class="package-icon">${t.icon}</div>
            <h4>${t.name}</h4>
            <p>Includes: ${t.includes}</p>
            <p>Report: ${t.report}</p>
            <p>Price: ₹${t.price}</p>
            ${t.popular ? '<span class="badge">Popular</span>' : ''}
            <button onclick="openForm('${t.name}')">Book Now</button>
        </div>
    `).join("");
}

// =======================
// Show Subcategories
// =======================
function showSubCategory(category) {
    const container = document.getElementById("subCategoryContainer");
    const section = document.getElementById("subCategorySection");
    const title = document.getElementById("subCategoryTitle");

    if (activeCategory === category) {
        section.style.display = "none";
        activeCategory = null;
        return;
    }

    activeCategory = category;
    container.innerHTML = "";
    title.innerText = category + " Tests";

    const data = subCategoryData[category];
    if (!data || data.length === 0) {
        container.innerHTML = "<p>No tests available</p>";
        section.style.display = "block";
        return;
    }

    data.forEach(test => {
        const card = document.createElement("div");
        card.className = "sub-card";
        card.innerHTML = `
            <div class="sub-top">
                <span class="sub-icon">${test.icon}</span>
                <h3>${test.name}</h3>
                ${test.popular ? '<span class="badge">Popular</span>' : ''}
            </div>
            <p class="includes">🧪 ${test.includes}</p>
            <div class="sub-meta">
                <span>⏱ ${test.report}</span>
                <span class="price">
                    <del>₹${parseInt(test.price) + 300}</del>
                    <b>₹${test.price}</b>
                </span>
            </div>
            <button class="book-btn" onclick="openForm('${test.name}')">Book Now</button>
        `;
        container.appendChild(card);
    });

    section.style.display = "block";
    window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
}

// =======================
// Search Tests
// =======================
function searchTest() {
    const val = document.getElementById("search").value.trim().toLowerCase();
    const container = document.getElementById("packageContainer");
    const subCategorySection = document.getElementById("subCategorySection");

    if (val === "") {
    container.innerHTML = "";
    container.classList.remove("active");

    // ✅ Hide all dynamic sections
    document.getElementById("categorySection").style.display = "none";
    subCategorySection.style.display = "none";

    // ✅ Scroll back to hero (important)
    window.scrollTo({ top: 0, behavior: "smooth" });

    return;
}

    subCategorySection.style.display = "none";
    container.classList.add("active");           // show container as grid

    const filtered = tests.filter(t =>
        (t.name || "").toLowerCase().includes(val) ||
        (t.category || "").toLowerCase().includes(val) ||
        (t.includes || "").toLowerCase().includes(val)
    );

    if (filtered.length === 0) {
        container.innerHTML = "<p>No tests found</p>";
    } else {
        container.innerHTML = filtered.map(t => `
            <div class="sub-card">
                <div class="sub-top">
                    <span class="sub-icon">${t.icon}</span>
                    <h3>${t.name}</h3>
                    ${t.popular ? '<span class="badge">Popular</span>' : ''}
                </div>
                <p class="includes">🧪 ${t.includes}</p>
                <div class="sub-meta">
                    <span>⏱ ${t.report}</span>
                    <span class="price">
                        <del>₹${parseInt(t.price) + 300}</del>
                        <b>₹${t.price}</b>
                    </span>
                </div>
                <button class="book-btn" onclick="openForm('${t.name}')">Book Now</button>
            </div>
        `).join("");
    }
}

// ===== Switch Tabs (Categories) =====
function switchTab(tab) {
    const categorySection = document.getElementById("categorySection");
    const subSection = document.getElementById("subCategorySection");

    if (tab === 'cat') {
        const isVisible = categorySection.style.display === "block";

        if (isVisible) {
            categorySection.style.display = "none";
            subSection.style.display = "none";
            activeCategory = null;
        } else {
            categorySection.style.display = "block";
            window.scrollTo({
                top: categorySection.offsetTop - 80,
                behavior: "smooth"
            });
        }
    }
}

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close nav when a link is clicked
document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// =======================
// Booking Form
// =======================
let currentBookingTest = null;
function openForm(testName) {
    currentBookingTest = testName;
    document.getElementById("form").style.display = "block";
    document.getElementById("form-title").textContent = `Book Test: ${testName}`;
    document.getElementById("userName").value = "";
    document.getElementById("userPhone").value = "";
    document.getElementById("testDate").value = "";
}

function closeForm() {
    document.getElementById("form").style.display = "none";
}

// =======================
// Live Location Detection
// =======================
function detectLiveLocation() {
    const searchInput = document.getElementById("search");

    // Check if location already saved in sessionStorage
    const savedArea = sessionStorage.getItem("userArea");
    if (savedArea) {
        searchInput.placeholder = `Search tests in ${savedArea}`;
        return;
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async pos => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
                    const data = await res.json();

                    const area = data.address.suburb || data.address.neighbourhood || data.address.city;
                    if (area) {
                        searchInput.placeholder = `Search tests in ${area}`;
                        sessionStorage.setItem("userArea", area);
                    } else {
                        searchInput.placeholder = "Search tests...";
                    }
                } catch {
                    searchInput.placeholder = "Search tests...";
                }
            },
            () => { searchInput.placeholder = "Search tests..."; }
        );
    } else {
        searchInput.placeholder = "Search tests...";
    }
}

detectLiveLocation();

/*function detectLocation(){
    const locationEl=document.getElementById("location");
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(
            pos=>locationEl.textContent=`Location detected (lat: ${pos.coords.latitude.toFixed(2)}, lon: ${pos.coords.longitude.toFixed(2)})`,
            err=>locationEl.textContent="Location permission denied."
        );
    } else locationEl.textContent="Geolocation not supported.";
}

detectLocation();*/

/*function detectLiveLocation() {
    const locationEl = document.getElementById("location");

    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                    );
                    const data = await res.json();

                    const area =
                        data.address.suburb ||
                        data.address.neighbourhood ||
                        data.address.city ||
                        data.address.town;

                    locationEl.textContent = area
                        ? `📍 ${area}`
                        : "📍 Location detected";
                } catch (err) {
                    console.error(err);
                    locationEl.textContent = "Error fetching area";
                }
            },
            (err) => {
                console.error(err);
                locationEl.textContent = "Location permission denied";
            },
            {
                enableHighAccuracy: true
            }
        );
    } else {
        locationEl.textContent = "Geolocation not supported";
    }
}*/

/*document.getElementById("search").addEventListener("input", function () {
    const val = this.value.toLowerCase();
    const container = document.getElementById("packageContainer");

    const filtered = tests.filter(t =>
        t.name.toLowerCase().includes(val) ||
        t.category.toLowerCase().includes(val) ||
        t.includes.toLowerCase().includes(val)
    );

    if (filtered.length === 0) {
        container.innerHTML = "<p>No tests found</p>";
        return;
    }

    container.innerHTML = filtered.map(t => `
        <div class="package-card">
            <img src="${t.icon}" alt="${t.category}">
            <h4>${t.name}</h4>
            <p>Includes: ${t.includes}</p>
            <p>Report: ${t.report}</p>
            <button onclick="openForm('${t.name}')">Book Now</button>
        </div>
    `).join("");
});*/

// ===== OPEN MODAL =====
var modal = document.getElementById("whatsappModal");
var waBtn = document.getElementById("whatsappBtn");
var closeBtn = document.getElementsByClassName("close")[0];

// --- Add this real-time phone validation here ---
var phoneInput = document.getElementById("phone");
var phoneError = document.getElementById("phoneError");

phoneInput.addEventListener("input", function () {
    var phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
        phoneError.style.display = "inline";
    } else {
        phoneError.style.display = "none";
    }
});

waBtn.addEventListener("click", function(e) {
    e.preventDefault();
    modal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// ===== SEND BOOKING TO WHATSAPP =====
document.getElementById("bookingForm").onsubmit = function(e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var address = document.getElementById("address").value.trim();

    var phonePattern = /^[6-9]\d{9}$/;

    // Check for valid phone number format
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit Indian mobile number starting with 6-9.");
        return false;
    }

    // Check that name and address are not empty
    if (!name || !address) {
        alert("Please fill in all required fields.");
        return false;
    }

    var message = `Hello! I want to book a lab test.\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    var encodedMessage = encodeURIComponent(message);

    var numbers = ["919867915433", "919326220296", "919372026433"];
    var hour = new Date().getHours();
    var agentNumber;

    if (hour >= 8 && hour < 14) agentNumber = numbers[0];
    else if (hour >= 14 && hour < 20) agentNumber = numbers[1];
    else agentNumber = numbers[2];

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = "https://wa.me/" + agentNumber + "?text=" + encodedMessage;
    } else {
        window.open("https://web.whatsapp.com/send?phone=" + agentNumber + "&text=" + encodedMessage, "_blank");
    }

    modal.style.display = "none";
};
// ===== OPEN WHATSAPP MODAL FOR SEARCH RESULTS =====
function openWhatsAppModal(testName) {
    // Show the modal
    modal.style.display = "block";

    // Pre-fill the "name" field with the test name
    var nameInput = document.getElementById("name");
    nameInput.value = testName;

    // Clear other fields
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
}

function callNow() {
    // Define your numbers with their time ranges (24-hour format)
    const numbers = [
        { number: "9867915433", startHour: 8, endHour: 16 },  // 8 AM to 4 PM
        { number: "9326220296", startHour: 16, endHour: 22 }, // 4 PM to 10 PM
        { number: "9372026433", startHour: 22, endHour: 8 }   // 10 PM to 8 AM (overnight)
    ];

    const now = new Date();
    const hour = now.getHours();

    // Find the number matching current time
    const currentNumber = numbers.find(n => {
        if (n.startHour < n.endHour) {
            return hour >= n.startHour && hour < n.endHour;
        } else {
            // Overnight case (e.g., 22 to 8)
            return hour >= n.startHour || hour < n.endHour;
        }
    });

    if (currentNumber) {
        // Redirect to call the number
        window.location.href = `tel:${currentNumber.number}`;
    } else {
        alert("Sorry, no contact number available at this time.");
    }
}
