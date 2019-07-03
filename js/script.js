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

function closeModal(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("modal-show");
  popup.classList.remove("modal-error");

  close.removeEventListener("click", closeModal);
  overlay.removeEventListener("click", closeModal);
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

  close.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
});


form.addEventListener("submit", function (evt) {

  if (!feedbackName.value || !feedbackEmail.value || !feedbackMessage.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    localStorage.setItem("feedbackName", feedbackName.value);
    localStorage.setItem("feedbackEmail", feedbackEmail.value);
  }
});

window.addEventListener("keyup", function (evt) {

  if (evt.keyCode === 27 && popup.classList.contains("modal-show")) {
    closeModal(evt);
  }
});

document.addEventListener("DOMContentLoaded", function(event) {
  ymaps.ready(init);

  function init() {
    var map = new ymaps.Map("yandex-map", {
      center: [59.939028, 30.329499],
      zoom: 16,
      controls: []
    });
    var placemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
      iconLayout: "default#image",
      iconImageHref: "img/pin-shadow.png",
      iconImageSize: [218, 142],
      iconImageOffset: [-35, -142]
    });

    map.geoObjects.add(placemark);
  }
});

