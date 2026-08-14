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

// Contact form submission via Web3Forms (static-site friendly form backend)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const accessKey = contactForm.querySelector('input[name="access_key"]').value;
  if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
    formStatus.textContent = "Form isn't fully set up yet. Add your Web3Forms access key in index.html.";
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
