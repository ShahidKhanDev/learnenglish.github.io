// DOM Elements
const openModalBtns = document.querySelectorAll("[data-modal-open]");
const closeModalBtns = document.querySelectorAll("[data-close-modal]");
const overlay = document.querySelector("[data-overlay]");
const openLoadingBtns = document.querySelectorAll("[data-open-loading]");
const navLinks = document.querySelectorAll(".nav__item");
const loading = document.querySelector("[data-loading]");
const mobMenu = document.querySelector(".mob__menu");
const courseCards = document.querySelectorAll(
  ".courses__section .course__card"
);
const lessonCards = document.querySelectorAll(
  ".course__lessons__section .lesson__card"
);
const lessonCardPopup = document.querySelector(".lesson__popup");

// hide loading
loading.classList.remove("show");

// opening the loading overlay when each clickable item is clicked
openLoadingBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    removeShowLoading();

    overlay.classList.remove("show");
    mobMenu.classList.remove("active");
    loading.classList.add("show");

    let linkTarget = btn.firstElementChild.href;

    if (btn.classList.contains("locked")) {
      loading.classList.remove("show");
      return;
    }

    if (linkTarget == undefined) {
      let linkTarget = btn.dataset.target;
      let courseId = btn.id;

      // save the courseId in localStorage
      localStorage.setItem("courseId", courseId);
      if (document.readyState == "complete") {
        setTimeout(() => {
          // loading.classList.remove("show");
          location.href = linkTarget;
        }, 2000);
      }
    } else {
      setTimeout(() => {
        loading.classList.remove("show");
        location.href = linkTarget;
      }, 2000);
    }
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
