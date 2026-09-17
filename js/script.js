(function () {
  "use strict";

  const CONFIG = {
    companyName: "Pravaah Solutions",
    email: "connect@pravaahsolutions.com",
    whatsappNumber: "YOUR_WHATSAPP_NUMBER",
    phone: "YOUR_PHONE_NUMBER",
    websiteUrl: "https://pravaahsolutions.com",
    formEndpoint: "",
    whatsappMessage: "Hi Pravaah Solutions, I'd like to discuss a project for my business.",
    social: {
      linkedin: "",
      instagram: "",
    },
  };

  initNavigation();
  initHeaderScroll();
  initScrollReveal();
  initSmoothScroll();
  initWhatsAppLinks();
  initContactDetails();
  initContactForm();
  initOptionalImages();

  function isPlaceholder(value) {
    return !value || /^YOUR_/i.test(value);
  }

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function whatsappUrl(message) {
    const text = encodeURIComponent(message || CONFIG.whatsappMessage);
    if (isPlaceholder(CONFIG.whatsappNumber)) {
      return "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Project enquiry") + "&body=" + text;
    }
    return "https://wa.me/" + digitsOnly(CONFIG.whatsappNumber) + "?text=" + text;
  }

  function initWhatsAppLinks() {
    document.querySelectorAll(".js-whatsapp").forEach(function (link) {
      link.setAttribute("href", whatsappUrl());
      link.setAttribute("target", isPlaceholder(CONFIG.whatsappNumber) ? "_self" : "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  function initContactDetails() {
    document.querySelectorAll(".js-email").forEach(function (link) {
      link.setAttribute("href", "mailto:" + CONFIG.email);
      link.textContent = CONFIG.email;
    });

    const year = new Date().getFullYear();
    document.querySelectorAll(".js-copyright").forEach(function (el) {
      el.textContent = "© " + year + " " + CONFIG.companyName + ". All rights reserved.";
    });

    const phoneWrap = document.querySelector(".js-phone-wrap");
    const phoneLink = document.querySelector(".js-phone");
    if (phoneWrap && phoneLink && !isPlaceholder(CONFIG.phone)) {
      phoneWrap.hidden = false;
      phoneLink.href = "tel:" + CONFIG.phone;
      phoneLink.textContent = CONFIG.phone;
    }

    const linkedin = document.querySelector(".js-social-linkedin");
    const instagram = document.querySelector(".js-social-instagram");
    if (linkedin && CONFIG.social.linkedin) {
      linkedin.href = CONFIG.social.linkedin;
      linkedin.classList.remove("is-placeholder");
      linkedin.setAttribute("target", "_blank");
      linkedin.setAttribute("rel", "noopener noreferrer");
    }
    if (instagram && CONFIG.social.instagram) {
      instagram.href = CONFIG.social.instagram;
      instagram.classList.remove("is-placeholder");
      instagram.setAttribute("target", "_blank");
      instagram.setAttribute("rel", "noopener noreferrer");
    }
  }

  function initNavigation() {
    const toggle = document.getElementById("menu-toggle");
    const panel = document.getElementById("nav-panel");
    const backdrop = document.getElementById("nav-backdrop");
    const header = document.getElementById("site-header");

    if (!toggle || !panel) return;

    function setOpen(open) {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (backdrop) backdrop.hidden = !open;
    }

    function closeMenu() {
      setOpen(false);
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(!document.body.classList.contains("nav-open"));
    });

    if (backdrop) {
      backdrop.addEventListener("click", closeMenu);
    }

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!document.body.classList.contains("nav-open")) return;
      if (header && header.contains(event.target)) return;
      closeMenu();
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right, .scale-in, .fade-in");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      link.addEventListener("click", function (event) {
        if (link.classList.contains("js-whatsapp")) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initOptionalImages() {
    document.querySelectorAll("[data-optional-image]").forEach(function (img) {
      img.addEventListener("error", function () {
        img.classList.add("is-missing");
      });
    });
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const submit = form.querySelector('button[type="submit"]');

    function showError(field, on) {
      const wrap = field.closest(".field");
      if (wrap) wrap.classList.toggle("error", on);
    }

    function payloadFromForm() {
      return {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        need: form.need.value.trim() || "I'm not sure yet",
        details: form.details.value.trim(),
      };
    }

    function fallbackMessage(data) {
      return [
        CONFIG.whatsappMessage,
        "",
        "Name: " + data.name,
        "Phone / WhatsApp: " + data.phone,
        "Email: " + data.email,
        "Need: " + data.need,
        "",
        data.details,
      ].join("\n");
    }

    function succeed() {
      form.reset();
      form.hidden = true;
      if (status) {
        status.className = "form-status success";
        status.textContent = "Thanks. We'll get back to you shortly.";
      }
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Start The Conversation";
      }
    }

    function fallback(data) {
      const message = fallbackMessage(data);
      if (status) {
        status.className = "form-status fail";
        status.textContent = isPlaceholder(CONFIG.whatsappNumber)
          ? "Opening email so we still receive your message."
          : "Opening WhatsApp so we still receive your message.";
      }
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Start The Conversation";
      }
      window.location.href = whatsappUrl(message);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const required = form.querySelectorAll("[required]");
      let ok = true;

      required.forEach(function (field) {
        const empty = !field.value.trim();
        const badEmail = field.type === "email" && !validEmail(field.value.trim());
        const invalid = empty || badEmail;
        showError(field, invalid);
        if (invalid) ok = false;
      });

      if (!ok) return;

      if (form._honey && form._honey.value) {
        succeed();
        return;
      }

      const data = payloadFromForm();

      if (!CONFIG.formEndpoint) {
        fallback(data);
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = "Sending…";
      }

      fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          succeed();
        })
        .catch(function () {
          fallback(data);
        });
    });
  }
})();
