const tests = [
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

renderCategories();

function showPackages(cat){
    const container=document.getElementById("packageContainer");
    const list=tests.filter(t=>t.category===cat);
    container.innerHTML=list.map(t=>`
        <div class="package-card">
            <img src="${t.icon}" alt="${t.category}">
            <h4>${t.name}</h4>
            <p>Includes: ${t.includes}</p>
            <p>Report: ${t.report}</p>
            <button onclick="openForm('${t.name}')">Book Now</button>
        </div>
    `).join("");
}

/*function searchTest(){
    const val=document.getElementById("search").value.toLowerCase();
    const container=document.getElementById("packageContainer");
    const list=tests.filter(t=>t.name.toLowerCase().includes(val));
    container.innerHTML=list.map(t=>`
        <div class="package-card">
            <img src="${t.icon}" alt="${t.category}">
            <h4>${t.name}</h4>
            <p>Includes: ${t.includes}</p>
            <p>Report: ${t.report}</p>
            <button onclick="openForm('${t.name}')">Book Now</button>
        </div>
    `).join("");
}*/

function searchTest() {
    const val = document.getElementById("search").value.toLowerCase();
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
}

function openForm(testName){
    currentBookingTest=testName;
    document.getElementById("form").style.display="block";
    document.getElementById("form-title").textContent=`Book Test: ${testName}`;
    document.getElementById("userName").value="";
    document.getElementById("userPhone").value="";
    document.getElementById("testDate").value="";
}

function closeForm(){ document.getElementById("form").style.display="none"; }

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

function detectLiveLocation() {
    const searchInput = document.getElementById("search");

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
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
                        data.address.city;

                    if (area) {
                        searchInput.placeholder = `Search tests in ${area}`;
                    } else {
                        searchInput.placeholder = "Search tests...";
                    }

                } catch (err) {
                    searchInput.placeholder = "Search tests...";
                }
            },
            () => {
                searchInput.placeholder = "Search tests...";
            }
        );
    }
}

detectLiveLocation();

document.getElementById("search").addEventListener("input", function () {
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
});

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

    if (hour >= 9 && hour < 18) agentNumber = numbers[0];
    else if (hour >= 18 && hour < 23) agentNumber = numbers[1];
    else agentNumber = numbers[2];

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = "https://wa.me/" + agentNumber + "?text=" + encodedMessage;
    } else {
        window.open("https://web.whatsapp.com/send?phone=" + agentNumber + "&text=" + encodedMessage, "_blank");
    }

    modal.style.display = "none";
};
