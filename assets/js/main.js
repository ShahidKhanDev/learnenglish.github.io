// DOM Elements
const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const openModalBtns = document.querySelectorAll("[data-modal-open]");
const closeModalBtns = document.querySelectorAll("[data-close-modal]");
const overlay = document.querySelector("[data-overlay]");
const openLoadingBtns = document.querySelectorAll("[data-open-loading]");
const navLinks = document.querySelectorAll(".nav__item");
const loader = document.querySelector(".loader");
const mobMenu = document.querySelector(".mob__menu");
const courseCards = document.querySelectorAll(
  ".courses__section .course__card"
);
const lessonCards = document.querySelectorAll(
  ".course__lessons__section .lesson__card"
);
const lessonCardPopup = document.querySelector(".lesson__popup");

// remove the loader when the page loads
window.addEventListener("load", () => {
  loader.classList.add("hide");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});

// active header
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 20) {
    header.classList.add("sticky");
    logo.classList.add("active");
  } else {
    header.classList.remove("sticky");
    logo.classList.remove("active");
  }
});

// course cards when clicked
courseCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (card.classList.contains("locked")) {
      e.preventDefault();
    }
    // getting the courseId from the card
    let courseId = card.id;
    // save the courseId in localStorage
    localStorage.setItem("courseId", courseId);
  });
});

// remove show class from the loading
function removeShowLoading() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      removeShowLoading();
      loading.classList.add("show");
    });
  });
}

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = document.querySelector(btn.dataset.modalOpen);
    openModal(modal);
  });
});

closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    closeModal(modal);
  });
});

// open modal
function openModal(modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("show");
}

// close modal
function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("show");
}

/**
 * Lesson Cards
 */
lessonCards.forEach((card) => {
  card.addEventListener("click", () => {
    lessonCardPopup.classList.add("active");
    overlay.classList.add("show");
  });
});

//overlay
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("show");
    mobMenu.classList.remove("active");
  }
});
