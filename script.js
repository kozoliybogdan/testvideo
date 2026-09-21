const video = document.querySelector("#memory-video");
const player = document.querySelector(".player");
const playButton = document.querySelector("#play-button");
const playLabel = document.querySelector("#play-label");
const playerMessage = document.querySelector("#player-message");

const setButton = (label, visible = true) => {
  playLabel.textContent = label;
  playButton.setAttribute("aria-label", label);
  playButton.classList.toggle("is-hidden", !visible);
};

const showMessage = (message) => {
  playerMessage.textContent = message;
};

const playVideo = async () => {
  showMessage("");
  video.muted = false;
  video.volume = 1;

  if (video.ended) {
    video.currentTime = 0;
  }

  try {
    await video.play();
  } catch (error) {
    setButton("Посмотреть", true);
    showMessage("Нажмите ещё раз, чтобы начать просмотр");
  }
};

playButton.addEventListener("click", playVideo);

video.addEventListener("play", () => {
  player.classList.add("is-playing");
  setButton("Посмотреть", false);
  video.controls = true;
});

video.addEventListener("pause", () => {
  player.classList.remove("is-playing");

  if (!video.ended) {
    setButton("Продолжить", true);
  }
});

video.addEventListener("ended", () => {
  player.classList.remove("is-playing");
  video.controls = false;
  setButton("Посмотреть ещё раз", true);
});

video.addEventListener("error", () => {
  player.classList.remove("is-playing");
  setButton("Видео недоступно", true);
  playButton.disabled = true;
  showMessage("Проверьте, что файл video.mp4 лежит рядом с index.html");
});
