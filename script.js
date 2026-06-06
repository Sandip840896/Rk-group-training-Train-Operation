const slides = Array.from(document.querySelectorAll(".slide"));
const nav = document.getElementById("slideNav");
const progressBar = document.getElementById("progressBar");
const counter = document.getElementById("slideCounter");
const deck = document.getElementById("deck");
const dialog = document.getElementById("infoDialog");
const dialogText = document.getElementById("dialogText");
let current = 0;

const quiz = [
  ["What should you do first during a complaint?", ["Interrupt and explain", "Listen completely", "Call another vendor"], 1],
  ["Can a vendor sell above MRP?", ["Yes", "No", "Only if passenger agrees"], 1],
  ["ID card should be:", ["Hidden in pocket", "Visible and verifiable", "Kept at home"], 1],
  ["Best tone with passengers:", ["Calm and respectful", "Loud and strict", "Silent"], 0],
  ["Passage should be:", ["Blocked by tray", "Clear", "Used for storage"], 1],
  ["Tobacco during duty is:", ["Allowed", "Strictly prohibited", "Allowed after lunch"], 1],
  ["If passenger records video, staff should:", ["Argue", "Stay calm and solve", "Hide"], 1],
  ["Clean uniform means:", ["Professional image", "Optional detail", "Only for inspection"], 0],
  ["Food safety starts with:", ["Fast selling", "Clean hands", "High voice"], 1],
  ["Unauthorized vendor should be:", ["Ignored", "Reported immediately", "Allowed to sell"], 1],
  ["After solving complaint, vendor should:", ["Leave silently", "Thank and close politely", "Blame passenger"], 1],
  ["Equipment issue should be:", ["Reported", "Hidden", "Ignored until next trip"], 0],
  ["Passenger safety is:", ["Our responsibility", "Only railway duty", "Not vendor duty"], 0],
  ["Fair pricing builds:", ["Trust", "Fear", "Confusion"], 0],
  ["RK Group promise includes:", ["Clean food and honest service", "Overcharging", "No ID card"], 0]
];

function buildNav() {
  slides.forEach((slide, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = String(index + 1).padStart(2, "0");
    btn.title = slide.dataset.title || `Slide ${index + 1}`;
    btn.addEventListener("click", () => goTo(index));
    nav.appendChild(btn);
  });
}

function goTo(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  Array.from(nav.children).forEach((btn, i) => btn.classList.toggle("active", i === current));
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  counter.textContent = `${current + 1} / ${slides.length}`;
  deck.focus({ preventScroll: true });
}

function showDialog(text) {
  dialogText.textContent = text;
  dialog.showModal();
}

function wireCards() {
  document.querySelectorAll("[data-popup]").forEach((button) => {
    button.addEventListener("click", () => showDialog(button.dataset.popup));
  });

  document.querySelectorAll(".service-cards button").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("serviceDetail").textContent = button.dataset.detail;
    });
  });

  document.querySelectorAll("[data-branch]").forEach((button) => {
    button.addEventListener("click", () => {
      const result = document.getElementById("branchResult");
      if (button.dataset.branch === "wrong") {
        result.textContent = "Wrong path: argument, viral video, passenger complaint, IRCTC escalation, and brand damage.";
        result.style.color = "#ffb4a8";
      } else {
        result.textContent = "Correct path: calm listening, apology for inconvenience, practical solution, supervisor escalation if required, and polite closure.";
        result.style.color = "#b8f7cd";
      }
    });
  });

  document.getElementById("agreeBtn").addEventListener("click", () => {
    document.querySelectorAll("#oathList li").forEach((item, index) => {
      window.setTimeout(() => item.classList.add("visible"), index * 260);
    });
  });
}

function buildQuiz() {
  const box = document.getElementById("quizBox");
  quiz.forEach(([question, options], qIndex) => {
    const wrap = document.createElement("div");
    wrap.className = "question";
    const title = document.createElement("p");
    title.textContent = `${qIndex + 1}. ${question}`;
    wrap.appendChild(title);
    options.forEach((option, oIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${qIndex}`;
      input.value = oIndex;
      label.append(input, ` ${option}`);
      wrap.appendChild(label);
    });
    box.appendChild(wrap);
  });

  document.getElementById("submitQuiz").addEventListener("click", () => {
    let score = 0;
    quiz.forEach(([, , correct], qIndex) => {
      const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
      if (selected && Number(selected.value) === correct) score += 1;
    });
    const percent = Math.round((score / quiz.length) * 100);
    const result = document.getElementById("quizResult");
    result.textContent = `Score: ${score}/${quiz.length} (${percent}%). ${percent >= 80 ? "Certificate ready: Passenger Service Excellence completed." : "Please revise the key standards and try again."}`;
  });
}

function wireControls() {
  document.getElementById("prevBtn").addEventListener("click", () => goTo(current - 1));
  document.getElementById("nextBtn").addEventListener("click", () => goTo(current + 1));
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => goTo(Number(button.dataset.go)));
  });
  document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
  document.getElementById("fullscreenBtn").addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "PageDown") goTo(current + 1);
    if (event.key === "ArrowLeft" || event.key === "PageUp") goTo(current - 1);
    if (event.key === "Home") goTo(0);
    if (event.key === "End") goTo(slides.length - 1);
    if (event.key.toLowerCase() === "f") document.getElementById("fullscreenBtn").click();
  });
}

buildNav();
wireCards();
buildQuiz();
wireControls();
goTo(0);
