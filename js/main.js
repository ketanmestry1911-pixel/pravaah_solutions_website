(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var drops = document.querySelectorAll(".nav-drop > button");
  var form = document.getElementById("contact-form");
  var FORM_ENDPOINT = "";

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".nav-panel a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  drops.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 959px)").matches) {
        e.preventDefault();
        btn.parentElement.classList.toggle("open");
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (header && !header.contains(e.target)) {
      document.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  });

  function showError(field, on) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    wrap.classList.toggle("error", on);
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var required = form.querySelectorAll("[required]");
      var ok = true;

      required.forEach(function (field) {
        var empty = !field.value.trim();
        var badEmail = field.type === "email" && !validEmail(field.value.trim());
        var invalid = empty || badEmail;
        showError(field, invalid);
        if (invalid) ok = false;
      });

      if (!ok) return;

      var payload = {
        name: form.name.value,
        company: form.company.value,
        email: form.email.value,
        phone: form.phone.value,
        business: form.business.value,
        lookingFor: form.lookingFor.value,
        outcome: form.outcome.value,
        message: form.message.value,
      };

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending…";

      function succeed() {
        form.reset();
        form.hidden = true;
        status.className = "form-status success";
        status.textContent = "Thanks for reaching out. We'll get back to you soon.";
        btn.disabled = false;
        btn.textContent = "Start a Conversation";
      }

      function fail() {
        status.className = "form-status fail";
        status.textContent = "Something went wrong. Please email connect@pravaahsolutions.com.";
        btn.disabled = false;
        btn.textContent = "Start a Conversation";
      }

      if (!FORM_ENDPOINT) {
        window.setTimeout(succeed, 500);
        return;
      }

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          succeed();
        })
        .catch(fail);
    });
  }
})();
