const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const savedTheme = localStorage.getItem("minhaz-theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

themeToggle?.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("minhaz-theme", next);
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Certifications: rendered dynamically so a real verification link only
// appears once verificationUrl is actually filled in. Never invent URLs here.
const certifications = [
  { title: "Google Analytics / GA4", issuer: "Google Skillshop", description: "Verified certification or course credential.", verificationUrl: "" },
  { title: "SEO / Search Certification", issuer: "", description: "Add the exact certification name and issuing organization.", verificationUrl: "" },
  { title: "AI / Data Certification", issuer: "", description: "Add only a legitimate completed credential.", verificationUrl: "" }
];

const certGrid = document.getElementById("certGrid");
if (certGrid) {
  certGrid.innerHTML = certifications.map((cert, i) => {
    const num = String(i + 1).padStart(2, "0");
    const hasLink = typeof cert.verificationUrl === "string" && cert.verificationUrl.trim().length > 0;
    const linkHtml = hasLink
      ? `<a href="${cert.verificationUrl}" target="_blank" rel="noopener noreferrer">View verification link →</a>`
      : `<span class="cert-pending">Verification link coming soon</span>`;
    return `<article class="cert"><span>${num}</span><h3>${cert.title}</h3><p>${cert.description}</p>${linkHtml}</article>`;
  }).join("");
}

// Contact form submission via Web3Forms (static-site friendly form backend)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // hCaptcha renders a hidden textarea named h-captcha-response inside the
  // .h-captcha div once the visitor completes the checkbox challenge.
  const hcaptchaField = contactForm.querySelector('textarea[name="h-captcha-response"]');
  if (!hcaptchaField || !hcaptchaField.value) {
    formStatus.textContent = "Please complete the captcha check before submitting.";
    formStatus.className = "form-status error";
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  formStatus.textContent = "Sending...";
  formStatus.className = "form-status loading";

  try {
    const formData = new FormData(contactForm);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      formStatus.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
      formStatus.className = "form-status success";
      contactForm.reset();
    } else {
      formStatus.textContent = "Something went wrong. Please try again or email me directly.";
      formStatus.className = "form-status error";
    }
  } catch (err) {
    formStatus.textContent = "Network error. Please check your connection and try again.";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
  }
});
