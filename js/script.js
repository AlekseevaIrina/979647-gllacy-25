
var link = document.querySelector(".button-contacts");

var overlay = document.querySelector(".overlay");

var popup = document.querySelector(".modal-feedback");
var close = popup.querySelector(".modal-close");
var form = popup.querySelector("form");

var feedbackName = popup.querySelector(".feedback-name");
var feedbackEmail = popup.querySelector(".feedback-email");
var feedbackMessage = popup.querySelector(".feedback-message");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("feedbackName");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  overlay.classList.add("modal-show");
  if (storage) {
    feedbackName.value = storage;
    feedbackEmail.focus();
  } else {
    feedbackName.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

overlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  if (!feedbackName.value || !feedbackEmail.value || !feedbackMessage.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  }
  else {
    localStorage.setItem("feedbackName", feedbackName.value);
    localStorage.setItem("feedbackEmail", feedbackEmail.value);
  }
});

window.addEventListener("keydown", function (evt) {

  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
      overlay.classList.remove("modal-show");
    }
  }
});
