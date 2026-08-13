(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var drops = document.querySelectorAll(".nav-drop > button");
  var form = document.getElementById("contact-form");
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/connect@pravaahsolutions.com";

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

      if (form._honey && form._honey.value) {
        document.getElementById("form-status").className = "form-status success";
        document.getElementById("form-status").textContent =
          "Thanks for reaching out. We'll get back to you soon.";
        form.hidden = true;
        return;
      }

      var payload = {
        name: form.name.value.trim(),
        company: form.company.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        business: form.business.value.trim(),
        lookingFor: form.lookingFor.value,
        outcome: form.outcome.value.trim(),
        message: form.message.value.trim(),
        _replyto: form.email.value.trim(),
        _subject: "New Pravaah website lead",
        _template: "table",
        _captcha: "false",
      };

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending…";

      function mailtoUrl() {
        var body = [
          "Name: " + payload.name,
          "Company: " + payload.company,
          "Work email: " + payload.email,
          "Phone: " + payload.phone,
          "Business: " + payload.business,
          "Looking for: " + payload.lookingFor,
          "Outcome: " + payload.outcome,
          "",
          payload.message,
        ].join("\n");
        return (
          "mailto:connect@pravaahsolutions.com" +
          "?subject=" +
          encodeURIComponent("New Pravaah website lead") +
          "&body=" +
          encodeURIComponent(body)
        );
      }

      function succeed() {
        form.reset();
        form.hidden = true;
        status.className = "form-status success";
        status.textContent = "Thanks for reaching out. We'll get back to you soon.";
        btn.disabled = false;
        btn.textContent = "Start a Conversation";
      }

      function fail() {
        var href = mailtoUrl();
        status.className = "form-status fail";
        status.replaceChildren();
        status.appendChild(
          document.createTextNode("The form service was unavailable. ")
        );
        var link = document.createElement("a");
        link.href = href;
        link.textContent = "Send this enquiry by email instead";
        status.appendChild(link);
        btn.disabled = false;
        btn.textContent = "Start a Conversation";
        window.location.href = href;
      }

      var controller = new AbortController();
      var timer = window.setTimeout(function () {
        controller.abort();
      }, 12000);

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok || data.error) throw new Error(data.error || "Request failed");
            succeed();
          });
        })
        .catch(fail)
        .finally(function () {
          window.clearTimeout(timer);
        });
    });
  }
})();
