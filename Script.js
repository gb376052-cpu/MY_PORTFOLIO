/* =========================================================
   Main Portfolio JavaScript File (script.js)
   ========================================================= */

// Global functions for CV Modal (so inline HTML onclick works)
window.openCV = function() {
    const modal = document.getElementById("cvModal");
    if (modal) modal.style.display = "block";
};

window.closeCV = function() {
    const modal = document.getElementById("cvModal");
    if (modal) modal.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. Scroll Reveal Animation
    // ==========================================
    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        reveals.forEach((section) => {
            const top = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (top < windowHeight - 100) {
                section.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();


    // ==========================================
    // 2. Dark / Light Mode Toggle + Memory
    // ==========================================
    const themeBtn = document.getElementById("theme-btn");
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.innerHTML = "☀️";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                themeBtn.innerHTML = "☀️";
                localStorage.setItem("portfolio-theme", "dark");
            } else {
                themeBtn.innerHTML = "🌙";
                localStorage.setItem("portfolio-theme", "light");
            }
        });
    }


    // ==========================================
    // 3. Mobile Menu Toggle (Hamburger Navigation)
    // ==========================================
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector("nav");
    const navLinksList = document.querySelectorAll("nav a");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinksList.forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }


    // ==========================================
    // 4. Active Navbar Highlighting on Scroll
    // ==========================================
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    function highlightNavOnScroll() {
        let current = "";
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (current && link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", highlightNavOnScroll);


    // ==========================================
    // 5. Contact Form Validation & EmailJS Integration
    // ==========================================
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const phoneInput = document.getElementById("phone");
            const messageInput = document.getElementById("message");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            // Validation Checks
            if (name === "" || email === "" || phone === "" || message === "") {
                alert("⚠️ Please fill in all required fields!");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("⚠️ Please enter a valid email address!");
                return;
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                alert("⚠️ Please enter a valid 10-digit phone number!");
                return;
            }

            // EmailJS Send Logic
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // Updated with your credentials
            emailjs.sendForm('service_8qygxwu', 'template_xz5jk91', contactForm, 'n8WuR4Lsk1-9j6_nZ')
                .then(() => {
                    alert("✅ Thank you! Your message has been sent successfully.");
                    contactForm.reset();
                })
                .catch((error) => {
                    alert("❌ Failed to send message. Please check the browser console.");
                    console.error("EmailJS Error:", error);
                })
                .finally(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

});
