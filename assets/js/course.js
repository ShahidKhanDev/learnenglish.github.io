const courseHeroBg = document.querySelector(".course__hero__section");
const courseHeroText = document.querySelector(
  ".hero__section .hero__text__course"
);
const courseLessonCards = document.querySelectorAll(
  ".course__lessons__container .lesson__card"
);

// audio text
const audioText = document.querySelector(".aud__text");
const audioTextElem = audioText.querySelector(".text");
const audioTextTitle = document.querySelector(".aud__text .text .title");
const audioTextCopyBtn = document.querySelector(
  ".aud__text .copy__aud__text__btn"
);
const audioTextDownloadBtn = document.querySelector(
  ".aud__text .download__aud__text__btn"
);
const audioTextMessage = document.querySelector(".text__message");
const audioTextOpenBtn = document.querySelector(".aud__text__open__btn");
const audioTextCloseBtn = document.querySelector(".aud__text__close__btn");
const audioTextOverlay = document.querySelector(".aud__text__overlay");

// get the courseId from localStorage
const courseId = localStorage.getItem("courseId");

/* courseId = 1 => Vocabulary, courseId = 2 => Grammar
   courseId = 3 => Reading, courseId = 4 => Conversation
*/

if (document.readyState == "complete") {
  setTimeout(() => {
    loading.classList.remove("show");
  }, 2000);
}

courseHeroBg.style.background = "url('/assets/images/bg.jpg')";
courseHeroBg.style.backgroundRepeat = "no-repeat";
courseHeroBg.style.backgroundSize = "cover";
courseHeroBg.style.backgroundPosition = "center";

if (courseId == 1) {
  let courseText = `
    <h1 class="bg__text bg__text__course">
      <span>Vocabu</span><img src="./assets/images/vocabulary1.png" /><span class="has-color">lary</span>
    </h1>
    <p class="sm__text"></p>
  `;

  courseHeroText.innerHTML = courseText;
} else if (courseId == 2) {
  let courseText = `
    <h1 class="bg__text bg__text__course">
      <span>Gram</span><img src="./assets/images/grammar1.png" /><span class="has-color">mar</span>
    </h1>
    <p class="sm__text"></p>
  `;

  courseHeroText.innerHTML = courseText;
} else if (courseId == 3) {
  let courseText = `
  <h1 class="bg__text bg__text__course">
  <span>Read</span><img src="./assets/images/reading1.png" /><span class="has-color">ing</span>
  </h1>
  <p class="sm__text"></p>
  `;

  courseHeroText.innerHTML = courseText;
} else if (courseId == 4) {
  let courseText = `
    <h1 class="bg__text bg__text__course">
      <span>Conversa</span><img src="./assets/images/conversation1.png" /><span class="has-color">tion</span>
    </h1>
    <p class="sm__text"></p>
  `;

  courseHeroText.innerHTML = courseText;
}

function generateHeroText(course) {
  let courseText = `
    <h1 class="bg__text bg__text__course">
    <span>${course}</span><img src="./assets/images/${course}.png" /><span class="has-color">tion</span>
    </h1>
    <p class="sm__text">anytime and anywhere</p>
    <a href="#courses__section" class="btn__explore">Explore Courses</a>`;
  return (courseHeroText.innerHTML = courseText);
}

// get course name from the course Id
function getCourseName(courseId) {
  let result;
  if (courseId == 1) {
    result = "vocabulary";
  } else if (courseId == 2) {
    result = "grammar";
  } else if (courseId == 3) {
    result = "reading";
  } else if (courseId == 4) {
    result = "conversation";
  }

  return result;
}

// lesson Popup
const lessonPopupElem = document.querySelector(".lesson__popup");
const lessonPopupClose = document.querySelector(".lesson__popup .close-popup");
const lessonPopupMasterAud = document.querySelector(
  ".lesson__popup .master__audio"
);
const lessonPopupAudUrl = document.querySelector(".lesson__popup .audio__url");
const lessonPopupId = document.querySelector(".lesson__popup .lesson__id");
const lessonPopupCategoryHead = document.querySelector(
  ".lesson__popup .lesson__cat__head"
);
const lessonPopupNameTitle = document.querySelector(
  ".lesson__popup .lesson__name__title"
);

// https://cdn.sanity.io/files/rfaksjo9/production/11042272f71ca93cc6c9b04901f06584d8dfc107.mp3

// audio player
const audioPlayer = document.querySelector(".aud__player");
const audioProgressbar = document.querySelector(".aud__progressbar");
const audioPlayPopupBtn = document.querySelector(".lesson__popup .btn__play");
const audioDownloadPopupBtn = document.querySelector(
  ".lesson__popup .btn__download"
);
const audioSharePopupBtn = document.querySelector(".lesson__popup .btn__share");
const audioPlayMasterBtn = document.querySelector(".play__audio__btn");
const audioRepeatBtn = document.querySelector(".repeat__audio__btn");
const audioCurrTime = document.querySelector(".aud__current__time");
const audioEndTime = document.querySelector(".aud__end__time");
// const progressFull = document.querySelector(".progress__full2");

let music = new Audio("");

// audioPlayPopupBtn.addEventListener("click", () => {
//   audioPlayer.classList.add("active");
//   overlay.classList.remove("show");
//   lessonCardPopup.classList.remove("active");

//   const audioSrc = lessonPopupAudUrl.innerHTML.split("file-")[1].split("-")[0];
//   const audioExt = lessonPopupAudUrl.innerHTML.split("file-")[1].split("-")[1];

//   // getting the exact audio url
//   const audioURL = `${audioSrc}.${audioExt}`;

//   // changing the music src to the audio url
//   music.src = `https://cdn.sanity.io/files/${projectId}/${dataset}/${audioURL}`;
//   audioPlayMasterBtn.click();
// });

// download audio
audioDownloadPopupBtn.addEventListener("click", () => {
  const audioSrc = lessonPopupAudUrl.innerHTML.split("file-")[1].split("-")[0];
  const audioExt = lessonPopupAudUrl.innerHTML.split("file-")[1].split("-")[1];
  // getting the exact audio url
  const audioURL = `${audioSrc}.${audioExt}`;

  let dlLink = document.createElement("a");
  dlLink.setAttribute("download", "");
  dlLink.href = `https://cdn.sanity.io/files/${projectId}/${dataset}/${audioURL}`;

  dlLink.click();
  audioDownloadPopupBtn.appendChild(dlLink);
  setTimeout(() => {
    audioDownloadPopupBtn.removeChild(dlLink);
  }, 200);
});

// share the audio
audioSharePopupBtn.addEventListener("click", () => {
  console.log("sharing audio");
});

audioPlayMasterBtn.addEventListener("click", () => {
  music.paused || music.currentTime <= 0 ? playMusic() : pauseMusic();
});

function playMusic() {
  music.play();
  audioPlayMasterBtn.classList.add("active");
  audioPlayMasterBtn.firstElementChild.classList.replace("fa-play", "fa-pause");
}

function pauseMusic() {
  music.pause();
  audioPlayMasterBtn.classList.remove("active");
  audioPlayMasterBtn.firstElementChild.classList.replace("fa-pause", "fa-play");
}

music.addEventListener("loadstart", () => {
  audioProgressbar.value = 0;
});

music.addEventListener("timeupdate", (e) => {
  let currentTime = Math.floor(music.currentTime);
  let duration = Math.floor(music.duration);

  if (isNaN(duration)) {
    audioEndTime.textContent = "0:00";
  } else {
    // music end time
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    audioEndTime.textContent = `${min}:${sec}`;
  }

  // music start Time
  let min1 = Math.floor(currentTime / 60);
  let sec1 = Math.floor(currentTime % 60);
  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }
  audioCurrTime.textContent = `${min1}:${sec1}`;

  let percent = (music.currentTime / music.duration) * 100;
  audioProgressbar.value = percent;
  audioProgressbar.style.background =
    "linear-gradient(90deg, #1b1d20 " + percent + "%, #e2e2e2 0%)";
});

music.addEventListener("ended", () => {
  music.currentTime = 0;
  music.pause();
  audioPlayMasterBtn.firstElementChild.classList.replace("fa-pause", "fa-play");
});

audioProgressbar.addEventListener("change", () => {
  music.currentTime = (audioProgressbar.value * music.duration) / 100;
});

audioProgressbar.addEventListener("input", () => {
  music.currentTime = Math.floor(
    (audioProgressbar.value * music.duration) / 100
  );

  // when the audio is being played
  music.addEventListener("timeupdate", (e) => {
    let currentTime = Math.floor(music.currentTime);
    let duration = Math.floor(music.duration);

    if (isNaN(duration)) {
      audioEndTime.textContent = "0:00";
    }
    // music end time
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    audioEndTime.textContent = `${min}:${sec}`;

    // music start Time
    let min1 = Math.floor(currentTime / 60);
    let sec1 = Math.floor(currentTime % 60);
    if (sec1 < 10) {
      sec1 = `0${sec1}`;
    }
    audioCurrTime.textContent = `${min1}:${sec1}`;

    let percent = (music.currentTime / music.duration) * 100;
    audioProgressbar.value = percent;
    audioProgressbar.style.background =
      "linear-gradient(90deg, #1b1d20 " + percent + "%, #e2e2e2 0%)";
  });
});

// repeat audio
audioRepeatBtn.addEventListener("click", () => {
  if (!audioRepeatBtn.classList.contains("active")) {
    audioRepeatBtn.classList.add("active");
  } else {
    audioRepeatBtn.classList.remove("active");
  }
});

/**
 * audio text
 */

audioTextOpenBtn.addEventListener("click", () => {
  audioText.classList.toggle("active");
  audioTextOpenBtn.classList.toggle("active");
  audioTextOverlay.classList.toggle("active");
});

audioTextCloseBtn.addEventListener("click", () => {
  audioText.classList.remove("active");
  audioTextOpenBtn.classList.remove("active");
  audioTextOverlay.classList.remove("active");
});

/**
 * fetching the lessons from sanity
 */

const courseLessonsContainer = document.querySelector(
  ".course__lessons__container"
);
const messageElem = document.querySelector(".message");

const projectId = "rfaksjo9";
const dataset = "production";
const query = encodeURIComponent(
  `*[_type == "lessons" && category == "${getCourseName(courseId)}"]`
);

const fetchURL = `https://rfaksjo9.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;

async function getLessons() {
  messageElem.style.display = "block";
  const response = await fetch(fetchURL);
  const data = await response.json();
  messageElem.style.display = "none";

  createLessonCards(data);
}

// create lesson cards from the data
function createLessonCards(data) {
  const lessonData = data.result;

  if (lessonData.length > 0) {
    // retreive all the lessons
    let index = 0;
    for (let i = 0; i < lessonData.length; i++) {
      index++;

      let lessonCard = `
      <div class="lesson__card" data-audio-src="${
        lessonData[i].audio.asset._ref
      }" data-id="${lessonData[i]._id}">
        <div class="icon">
          <i class="fa fa-music"></i>
          <img src="" alt="" />
        </div>
        <div class="lesson__info">
          <span class="lesson__num">${addZero(index)}</span>
          <div class="right__row">
            <div class="lesson__name">${lessonData[i].lessonTitle}</div>
            <div class="lesson__det">
              <div class="lesson__cat">
                <span class="cat__name">${lessonData[i].category}</span>
                <p class="lesson__upload__date">${lessonData[i].uploadDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      courseLessonsContainer.innerHTML += lessonCard;
    }

    // getting all lesson cards
    const allLessonCards = document.querySelectorAll(
      ".course__lessons__container .lesson__card"
    );

    // when clicked on card the popup will appear up
    allLessonCards.forEach((card) => {
      card.addEventListener("click", () => {
        // remove the active class from the previous card
        allLessonCards.forEach((card) => {
          card.classList.remove("active");
        });

        // active the current card
        card.classList.add("active");
        overlay.classList.add("show");
        lessonPopupElem.classList.add("active");

        // getting card id
        const cardId = card.dataset.id;

        // getting category and lesson title name from the card
        const lessonCategory =
          card.children[1].children[1].children[1].children[0].children[0]
            .innerText;
        const lessonTitle = card.children[1].children[1].children[0].innerText;
        // passing it to the lesson popup
        lessonPopupCategoryHead.innerHTML = lessonCategory;
        lessonPopupNameTitle.innerHTML = lessonTitle;

        // create an attribute for the audio text div
        audioText.setAttribute("data-text-title", lessonTitle);

        // getting the audio src from the card
        const audioSrc = card.dataset.audioSrc;
        lessonPopupAudUrl.innerHTML = audioSrc;
        // passing this to the function generateAudioText()
        lessonPopupId.innerHTML = cardId;

        // when clicked on overlay
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) {
            // card.classList.remove("active");
            overlay.classList.remove("show");
            lessonCardPopup.classList.remove("active");
            mobMenu.classList.remove("active");
          }
        });

        // when clicked on close button of popup
        lessonPopupClose.addEventListener("click", () => {
          card.classList.remove("active");
          overlay.classList.remove("show");
          lessonCardPopup.classList.remove("active");
          mobMenu.classList.remove("active");
        });
      });
    });

    // playing the audio
    audioPlayPopupBtn.addEventListener("click", () => {
      audioPlayer.classList.add("active");
      overlay.classList.remove("show");
      lessonCardPopup.classList.remove("active");

      const audioSrc = lessonPopupAudUrl.innerHTML
        .split("file-")[1]
        .split("-")[0];
      const audioExt = lessonPopupAudUrl.innerHTML
        .split("file-")[1]
        .split("-")[1];

      // getting the exact audio url
      const audioURL = `${audioSrc}.${audioExt}`;

      // changing the music src to the audio url
      music.src = `https://cdn.sanity.io/files/${projectId}/${dataset}/${audioURL}`;
      // play the audio
      audioPlayMasterBtn.click();

      // generating the audio text from sanity.io using function
      generateAudText(data, lessonPopupId);
    });
  }
  messageElem.style.display = "block";
  messageElem.innerHTML = `Oops! No lessons found for ${getCourseName(
    courseId
  ).toUpperCase()}.`;
  messageElem.classList.add("error");
}

function addZero(num) {
  return num < 10 ? "0" + num : num;
}

function getAudioPath(url) {
  return url;
}

// generate the audio text from the data and LessonId Passed
function generateAudText(data, cardId) {
  cardId = cardId.innerText;
  const lessonData = data.result;
  audioTextElem.innerHTML = "";
  for (let i = 0; i < lessonData.length; i++) {
    let lessonId = lessonData[i]._id;
    if (cardId == lessonId) {
      if (lessonData[i].hasOwnProperty("richText")) {
        audioTextCopyBtn.style.display = "inline";
        audioTextDownloadBtn.style.display = "inline";

        const textHeadingStyle = lessonData[i].richText[0].style;
        const textHeading = lessonData[i].richText[0].children[0].text;

        audioTextTitle.innerHTML = `<${textHeadingStyle}>${textHeading}</${textHeadingStyle}>`;

        let richText = lessonData[i].richText;
        richText = Object.values(richText);

        for (let j = 1; j < richText.length; j++) {
          let textBody = document.createElement("p");
          textBody.innerHTML = richText[j].children[0].text;
          textBody.classList.add("text__body");

          audioTextElem.appendChild(textBody);
        }
      } else {
        audioTextElem.innerHTML =
          "<div class='no__text'>Oops! Sorry, No text available.</div>";
        audioTextCopyBtn.style.display = "none";
        audioTextDownloadBtn.style.display = "none";
      }
    }
  }
}

/**
 * copy audio text to clipboard
 */
audioTextCopyBtn.addEventListener("click", () => {
  let allTexts = [];

  for (let i = 0; i < audioTextElem.childElementCount; i++) {
    const textToCopy = audioTextElem.children[i].innerText;
    // navigator.clipboard.writeText(i);

    allTexts.push(textToCopy);
  }

  navigator.clipboard.writeText(allTexts.join("\n"));
  audioTextMessage.classList.add("active");
  audioTextMessage.innerHTML =
    '<p><i class="fa fa-check"></i> Copied successfully!</p>';

  setTimeout(() => {
    audioTextMessage.classList.remove("active");
  }, 800);
});

/**
 * download audio text as .txt file
 */

audioTextDownloadBtn.addEventListener("click", () => {
  // Define the text you want to write to the file
  // const text = "Hello, world! This is some text in a .txt file.";

  const textTitle =
    audioTextDownloadBtn.parentElement.parentElement.parentElement.getAttribute(
      "data-text-title"
    );

  const totalText =
    audioTextDownloadBtn.parentElement.parentElement.parentElement.children[1]
      .childElementCount;

  const text =
    audioTextDownloadBtn.parentElement.parentElement.parentElement.children[1]
      .children;

  // creating an empty array to store all the text
  let textData = [];
  for (let i = 0; i < totalText; i++) {
    // pushing all the texts from p tags to the array
    textData.push(text[i].innerText);
  }

  // download the text
  downloadTextFile(textData.join("\n"), textTitle);
});

function downloadTextFile(text, filename) {
  // Create a new Blob object with the text and set the MIME type to "text/plain"
  const blob = new Blob([text], { type: "text/plain" });

  // Create a URL object for the blob
  const url = URL.createObjectURL(blob);

  // Create a new link element
  const link = document.createElement("a");

  // Set the link's href attribute to the URL object
  link.href = url;

  // Set the link's download attribute to specify the file name
  link.download = filename;

  // Programmatically click the link to trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up by revoking the URL object
  URL.revokeObjectURL(url);

  audioTextMessage.classList.add("active");
  audioTextMessage.innerHTML =
    '<p><i class="fa fa-check"></i> Downloaded successfully!</p>';

  setTimeout(() => {
    audioTextMessage.classList.remove("active");
  }, 1000);
}

window.addEventListener("DOMContentLoaded", getLessons);
