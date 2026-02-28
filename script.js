var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < stars; i++) {
  var x = Math.random() * canvas.offsetWidth;
  var y = Math.random() * canvas.offsetHeight;
  var radius = Math.random() * 1.2;
  var hue = colorrange[getRandom(0, colorrange.length - 1)];
  var sat = getRandom(50, 100);
  var opacity = Math.random();
  starArray.push({ x, y, radius, hue, sat, opacity });
}

var sentences = [
  "Hi, my love.",
  "My future wife.",
  "Happy monthsary to us.",
  "Thank you for coming back to me",
  "Thank you for staying.",
  "Thank you for choosing me every day.",
  "Thank you for loving me even when I am not at my best.",
  "These past months have not been perfect.",
  "But they have been real.",
  "And I appreciate that more than you know.",
  "I appreciate you.",
  "There are times when we feel hurt, tired, or overwhelmed.",
  "But even through all of that, I still choose you.",
  "I still want to grow with you.",
  "I still want to build something deeper and stronger with you.",
  "Thank you for your patience.",
  "Thank you for your efforts.",
  "Thank you for your love.",
  "I am willing to keep working on myself too, for us.",
  "I love you so much.",
  "I love you on the easy days.",
  "I love you on the complicated ones.",
  "Happy monthsary, my love.",
  "I love you so much, my Hannah Ella Marie Galang",
];

var currentIndex = 0;
var opacity = 0;

const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

nextButton.addEventListener("click", () => {
  if (currentIndex < sentences.length - 1) {
    currentIndex++;
    opacity = 0;
  }
  if (currentIndex === sentences.length - 1) {
    nextButton.style.display = "none";
  }
  if (currentIndex > 0) {
    prevButton.style.display = "inline-block";
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    opacity = 0;
  }
  if (currentIndex === 0) {
    prevButton.style.display = "none";
  }
  nextButton.style.display = "inline-block";
});

function drawStars() {
  for (var i = 0; i < stars; i++) {
    var star = starArray[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 360);
    context.fillStyle =
      "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
    context.fill();
  }
}

function updateStars() {
  for (var i = 0; i < stars; i++) {
    if (Math.random() > 0.99) {
      starArray[i].opacity = Math.random();
    }
  }
}

function drawText() {
  var fontSize = Math.min(30, window.innerWidth / 24);

  context.font = fontSize + "px Comic Sans MS";
  context.textAlign = "center";
  context.shadowColor = "rgba(45, 255, 45, 1)";
  context.shadowBlur = 8;

  context.fillStyle = `rgba(45, 255, 45, ${opacity})`;
  context.fillText(
    sentences[currentIndex],
    canvas.width / 2,
    canvas.height / 2,
  );

  if (opacity < 1) {
    opacity += 0.02;
  }

  context.shadowColor = "transparent";
  context.shadowBlur = 0;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  updateStars();
  drawText();
  window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

prevButton.style.display = "none";

window.requestAnimationFrame(draw);
