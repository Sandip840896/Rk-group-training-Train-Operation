const slides = Array.from(document.querySelectorAll(".slide"));
const nav = document.getElementById("slideNav");
const progressBar = document.getElementById("progressBar");
const counter = document.getElementById("slideCounter");
const deck = document.getElementById("deck");
const dialog = document.getElementById("infoDialog");
const dialogText = document.getElementById("dialogText");
let current = 0;
let activeLang = localStorage.getItem("rkSubtitleLang") || "en";

const slideSubtitles = {
  hi: {
    Start: "यात्री सेवा उत्कृष्टता प्रशिक्षण",
    Why: "एक गलत व्यवहार शिकायत, वीडियो और प्रतिष्ठा जोखिम बन सकता है।",
    Customer: "हम केवल खाना नहीं बेचते, हम यात्रियों की सेवा करते हैं।",
    Service: "पांच छोटे व्यवहार एक पेशेवर यात्री अनुभव बनाते हैं।",
    "Do / Don't": "विनम्रता से बात करें, MRP पर बेचें और रास्ता साफ रखें।",
    Complaint: "शांत रहें, सम्मान दें और समाधान प्रदान करें।",
    "Social Media": "वीडियो रिकॉर्ड होने पर अगले 30 सेकंड सबसे महत्वपूर्ण होते हैं।",
    MRP: "केवल स्वीकृत MRP पर बेचें। सही मूल्य विश्वास बनाता है।",
    Hygiene: "स्वच्छ भोजन सेवा शुरू होने से पहले शुरू होता है।",
    Uniform: "सही यूनिफॉर्म और दिखाई देने वाला QR ID अधिकृत सेवा साबित करता है।",
    Unauthorized: "अनधिकृत विक्रेता की पहचान करें, रिपोर्ट करें और तुरंत सूचना दें।",
    Equipment: "सुरक्षित उपकरण भोजन गुणवत्ता और सेवा निरंतरता को मजबूत रखते हैं।",
    Guidelines: "स्वच्छता, सुरक्षा, भोजन गुणवत्ता और अनुशासन दैनिक मानक हैं।",
    Promise: "छह वचन बताते हैं कि RK Group हर यात्री की सेवा कैसे करता है।",
    Oath: "सहमति पर क्लिक करें और प्रतिबद्धताएं एक-एक करके देखें।",
    Quiz: "15 प्रश्नों के उत्तर दें और अपना स्कोर देखें।",
    Closing: "यात्री हमारा भगवान है। सेवा हमारा धर्म है।"
  },
  bn: {
    Start: "যাত্রী সেবা উৎকর্ষ প্রশিক্ষণ",
    Why: "একটি ভুল আচরণ অভিযোগ, ভিডিও এবং সুনামের ঝুঁকি তৈরি করতে পারে।",
    Customer: "আমরা শুধু খাবার বিক্রি করি না, আমরা যাত্রীদের সেবা করি।",
    Service: "পাঁচটি ছোট আচরণ একটি পেশাদার যাত্রী অভিজ্ঞতা তৈরি করে।",
    "Do / Don't": "ভদ্রভাবে কথা বলুন, MRP-তে বিক্রি করুন এবং পথ খালি রাখুন।",
    Complaint: "শান্ত থাকুন, সম্মান দেখান এবং সমাধান দিন।",
    "Social Media": "যাত্রী ভিডিও করলে পরের ৩০ সেকেন্ড গল্প নির্ধারণ করে।",
    MRP: "শুধু অনুমোদিত MRP-তে বিক্রি করুন। সঠিক দাম বিশ্বাস তৈরি করে।",
    Hygiene: "পরিষ্কার খাবার পরিবেশনের আগে থেকেই শুরু হয়।",
    Uniform: "সঠিক ইউনিফর্ম এবং দৃশ্যমান QR ID অনুমোদিত সেবা প্রমাণ করে।",
    Unauthorized: "অননুমোদিত বিক্রেতাকে চিহ্নিত করুন, রিপোর্ট করুন এবং দ্রুত জানান।",
    Equipment: "নিরাপদ সরঞ্জাম খাবারের মান এবং সেবার ধারাবাহিকতা বজায় রাখে।",
    Guidelines: "পরিচ্ছন্নতা, নিরাপত্তা, খাবারের মান এবং শৃঙ্খলা প্রতিদিনের মানদণ্ড।",
    Promise: "ছয়টি প্রতিশ্রুতি জানায় RK Group কীভাবে প্রতিটি যাত্রীকে সেবা দেয়।",
    Oath: "সম্মতিতে ক্লিক করুন এবং প্রতিশ্রুতিগুলি একে একে দেখুন।",
    Quiz: "১৫টি প্রশ্নের উত্তর দিন এবং আপনার স্কোর দেখুন।",
    Closing: "যাত্রী আমাদের ঈশ্বর। সেবা আমাদের ধর্ম।"
  }
};

const popupTranslations = {
  hi: {
    "Complaints rise when staff argue, overcharge, block movement, or ignore hygiene.": "जब कर्मचारी बहस करते हैं, अधिक कीमत लेते हैं, रास्ता रोकते हैं या स्वच्छता को नजरअंदाज करते हैं, शिकायतें बढ़ती हैं।",
    "A passenger video can travel faster than any internal report. Calm behaviour protects the brand.": "यात्री का वीडियो किसी भी आंतरिक रिपोर्ट से तेज फैल सकता है। शांत व्यवहार ब्रांड की रक्षा करता है।",
    "IRCTC compliance is not optional: pricing, ID card, hygiene, and vendor authorization must be visible.": "IRCTC अनुपालन वैकल्पिक नहीं है: मूल्य, ID कार्ड, स्वच्छता और विक्रेता अनुमति स्पष्ट होनी चाहिए।",
    "Trust is built through daily behaviour: smile, listen, serve safely, and close politely.": "विश्वास रोज के व्यवहार से बनता है: मुस्कुराएं, सुनें, सुरक्षित सेवा दें और विनम्रता से समाप्त करें।",
    "Never argue. Listen, acknowledge, and offer a solution or escalation.": "कभी बहस न करें। सुनें, स्वीकार करें और समाधान या एस्केलेशन दें।",
    "Do not sell above MRP. Pricing violations create complaints and compliance risk.": "MRP से ऊपर न बेचें। गलत मूल्य शिकायत और अनुपालन जोखिम बनाता है।",
    "Keep aisles clear so passengers and railway staff can move safely.": "रास्ता साफ रखें ताकि यात्री और रेलवे कर्मचारी सुरक्षित चल सकें।",
    "Let the passenger explain fully without interruption.": "यात्री को बिना टोके पूरी बात बताने दें।",
    "Keep voice low, posture open, and words respectful.": "आवाज धीमी, व्यवहार खुला और शब्द सम्मानजनक रखें।",
    "Use empathy: I understand your concern and I will help.": "सहानुभूति दिखाएं: मैं आपकी परेशानी समझता हूं और मदद करूंगा।",
    "Offer replacement, refund route, supervisor escalation, or correct information.": "बदलाव, रिफंड प्रक्रिया, सुपरवाइजर एस्केलेशन या सही जानकारी दें।",
    "Thank the passenger and close politely after action is taken.": "कार्यवाही के बाद यात्री को धन्यवाद दें और विनम्रता से बात समाप्त करें।",
    "Clean after use, report heating or electrical issues.": "उपयोग के बाद साफ करें और हीटिंग या बिजली की समस्या रिपोर्ट करें।",
    "Handle hot water safely and report leakage.": "गर्म पानी सुरक्षित संभालें और लीकेज रिपोर्ट करें।",
    "Use only approved containers and keep interior clean.": "केवल स्वीकृत कंटेनर उपयोग करें और अंदर साफ रखें।",
    "Maintain temperature and close doors properly.": "तापमान बनाए रखें और दरवाजे ठीक से बंद करें।",
    "Keep surface dry and report damage immediately.": "सतह सूखी रखें और नुकसान तुरंत रिपोर्ट करें।"
  },
  bn: {
    "Complaints rise when staff argue, overcharge, block movement, or ignore hygiene.": "কর্মীরা তর্ক করলে, বেশি দাম নিলে, পথ আটকালে বা স্বাস্থ্যবিধি না মানলে অভিযোগ বাড়ে।",
    "A passenger video can travel faster than any internal report. Calm behaviour protects the brand.": "যাত্রীর ভিডিও যেকোনো অভ্যন্তরীণ রিপোর্টের চেয়ে দ্রুত ছড়াতে পারে। শান্ত আচরণ ব্র্যান্ডকে রক্ষা করে।",
    "IRCTC compliance is not optional: pricing, ID card, hygiene, and vendor authorization must be visible.": "IRCTC নিয়ম মানা বাধ্যতামূলক: দাম, ID কার্ড, স্বাস্থ্যবিধি এবং অনুমোদন দৃশ্যমান থাকতে হবে।",
    "Trust is built through daily behaviour: smile, listen, serve safely, and close politely.": "বিশ্বাস তৈরি হয় প্রতিদিনের আচরণে: হাসুন, শুনুন, নিরাপদে পরিবেশন করুন এবং ভদ্রভাবে শেষ করুন।",
    "Never argue. Listen, acknowledge, and offer a solution or escalation.": "কখনও তর্ক করবেন না। শুনুন, স্বীকার করুন এবং সমাধান বা এসকেলেশন দিন।",
    "Do not sell above MRP. Pricing violations create complaints and compliance risk.": "MRP-এর বেশি দামে বিক্রি করবেন না। ভুল দাম অভিযোগ এবং নিয়মের ঝুঁকি তৈরি করে।",
    "Keep aisles clear so passengers and railway staff can move safely.": "পথ খালি রাখুন যাতে যাত্রী ও রেলকর্মীরা নিরাপদে চলতে পারেন।",
    "Let the passenger explain fully without interruption.": "যাত্রীকে বাধা না দিয়ে পুরো সমস্যা বলতে দিন।",
    "Keep voice low, posture open, and words respectful.": "কণ্ঠস্বর নিচু রাখুন, ভঙ্গি খোলা রাখুন এবং সম্মানজনক কথা বলুন।",
    "Use empathy: I understand your concern and I will help.": "সহানুভূতি দেখান: আমি আপনার সমস্যা বুঝছি এবং সাহায্য করব।",
    "Offer replacement, refund route, supervisor escalation, or correct information.": "বদল, রিফান্ড প্রক্রিয়া, সুপারভাইজার এসকেলেশন বা সঠিক তথ্য দিন।",
    "Thank the passenger and close politely after action is taken.": "সমাধানের পর যাত্রীকে ধন্যবাদ দিন এবং ভদ্রভাবে কথা শেষ করুন।",
    "Clean after use, report heating or electrical issues.": "ব্যবহারের পর পরিষ্কার করুন এবং হিটিং বা বিদ্যুৎ সমস্যা রিপোর্ট করুন।",
    "Handle hot water safely and report leakage.": "গরম জল সাবধানে ব্যবহার করুন এবং লিকেজ রিপোর্ট করুন।",
    "Use only approved containers and keep interior clean.": "শুধু অনুমোদিত পাত্র ব্যবহার করুন এবং ভেতর পরিষ্কার রাখুন।",
    "Maintain temperature and close doors properly.": "তাপমাত্রা বজায় রাখুন এবং দরজা ঠিকভাবে বন্ধ করুন।",
    "Keep surface dry and report damage immediately.": "পৃষ্ঠ শুকনো রাখুন এবং ক্ষতি হলে সঙ্গে সঙ্গে রিপোর্ট করুন।"
  }
};

const detailTranslations = {
  hi: {
    "Click any behaviour to see the service standard.": "सेवा मानक देखने के लिए किसी भी व्यवहार पर क्लिक करें।",
    "Start with eye contact and a calm face. A smile lowers complaint energy before words begin.": "आंखों से संपर्क और शांत चेहरे से शुरू करें। मुस्कान बात शुरू होने से पहले तनाव कम करती है।",
    "Use simple greetings: Namaste, Sir, Madam. Speak in Hindi or English as needed.": "सरल अभिवादन करें: नमस्ते, सर, मैडम। जरूरत के अनुसार हिंदी या अंग्रेजी बोलें।",
    "Let the passenger finish the sentence. Never interrupt a complaint.": "यात्री को बात पूरी करने दें। शिकायत के बीच कभी न टोकें।",
    "Offer the available solution, alternate product, or escalation path.": "उपलब्ध समाधान, वैकल्पिक उत्पाद या एस्केलेशन मार्ग बताएं।",
    "Close with thanks. The final tone is what many passengers remember.": "धन्यवाद के साथ समाप्त करें। अंतिम व्यवहार यात्रियों को याद रहता है।"
  },
  bn: {
    "Click any behaviour to see the service standard.": "সেবার মান দেখতে যেকোনো আচরণে ক্লিক করুন।",
    "Start with eye contact and a calm face. A smile lowers complaint energy before words begin.": "চোখে চোখ রেখে শান্ত মুখে শুরু করুন। হাসি কথা শুরু হওয়ার আগেই উত্তেজনা কমায়।",
    "Use simple greetings: Namaste, Sir, Madam. Speak in Hindi or English as needed.": "সহজ অভিবাদন ব্যবহার করুন: নমস্তে, স্যার, ম্যাডাম। প্রয়োজন অনুযায়ী হিন্দি বা ইংরেজি বলুন।",
    "Let the passenger finish the sentence. Never interrupt a complaint.": "যাত্রীকে কথা শেষ করতে দিন। অভিযোগের সময় কখনও বাধা দেবেন না।",
    "Offer the available solution, alternate product, or escalation path.": "উপলব্ধ সমাধান, বিকল্প পণ্য বা এসকেলেশন পথ জানান।",
    "Close with thanks. The final tone is what many passengers remember.": "ধন্যবাদ দিয়ে শেষ করুন। শেষ আচরণটাই অনেক যাত্রী মনে রাখেন।"
  }
};

const branchTranslations = {
  hi: {
    wrong: "गलत रास्ता: बहस, वायरल वीडियो, यात्री शिकायत, IRCTC एस्केलेशन और ब्रांड नुकसान।",
    correct: "सही रास्ता: शांत सुनना, असुविधा के लिए माफी, व्यावहारिक समाधान, जरूरत हो तो सुपरवाइजर एस्केलेशन और विनम्र समापन।"
  },
  bn: {
    wrong: "ভুল পথ: তর্ক, ভাইরাল ভিডিও, যাত্রী অভিযোগ, IRCTC এসকেলেশন এবং ব্র্যান্ড ক্ষতি।",
    correct: "সঠিক পথ: শান্তভাবে শোনা, অসুবিধার জন্য ক্ষমা, বাস্তব সমাধান, প্রয়োজনে সুপারভাইজার এসকেলেশন এবং ভদ্রভাবে শেষ করা।"
  }
};

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

function withTranslation(english, group) {
  const translated = group?.[activeLang]?.[english];
  return activeLang === "en" || !translated ? english : `${english} (${translated})`;
}

function updateSlideSubtitles() {
  document.body.classList.toggle("has-local-subtitle", activeLang !== "en");
  slides.forEach((slide) => {
    let subtitle = slide.querySelector(".local-subtitle");
    if (!subtitle) {
      subtitle = document.createElement("p");
      subtitle.className = "local-subtitle";
      const title = slide.querySelector("h1, h2");
      title?.insertAdjacentElement("afterend", subtitle);
    }
    const text = slideSubtitles[activeLang]?.[slide.dataset.title] || "";
    subtitle.textContent = text ? `(${text})` : "";
  });
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === activeLang);
  });
}

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
  dialogText.textContent = withTranslation(text, popupTranslations);
  dialog.showModal();
}

function wireLanguagePicker() {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeLang = button.dataset.lang;
      localStorage.setItem("rkSubtitleLang", activeLang);
      updateSlideSubtitles();
      const serviceDetail = document.getElementById("serviceDetail");
      serviceDetail.textContent = withTranslation(serviceDetail.dataset.baseText || serviceDetail.textContent, detailTranslations);
    });
  });
}

function wireCards() {
  document.querySelectorAll("[data-popup]").forEach((button) => {
    button.addEventListener("click", () => showDialog(button.dataset.popup));
  });

  document.querySelectorAll(".service-cards button").forEach((button) => {
    button.addEventListener("click", () => {
      const serviceDetail = document.getElementById("serviceDetail");
      serviceDetail.dataset.baseText = button.dataset.detail;
      serviceDetail.textContent = withTranslation(button.dataset.detail, detailTranslations);
    });
  });

  document.querySelectorAll("[data-branch]").forEach((button) => {
    button.addEventListener("click", () => {
      const result = document.getElementById("branchResult");
      const wrong = "Wrong path: argument, viral video, passenger complaint, IRCTC escalation, and brand damage.";
      const correct = "Correct path: calm listening, apology for inconvenience, practical solution, supervisor escalation if required, and polite closure.";
      const english = button.dataset.branch === "wrong" ? wrong : correct;
      const local = branchTranslations[activeLang]?.[button.dataset.branch];
      result.textContent = activeLang === "en" || !local ? english : `${english} (${local})`;
      result.style.color = button.dataset.branch === "wrong" ? "#ffb4a8" : "#b8f7cd";
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
    const english = `Score: ${score}/${quiz.length} (${percent}%). ${percent >= 80 ? "Certificate ready: Passenger Service Excellence completed." : "Please revise the key standards and try again."}`;
    const hi = `स्कोर: ${score}/${quiz.length} (${percent}%). ${percent >= 80 ? "प्रमाणपत्र तैयार: यात्री सेवा उत्कृष्टता पूर्ण।" : "कृपया मुख्य मानक दोबारा पढ़ें और फिर प्रयास करें।"}`;
    const bn = `স্কোর: ${score}/${quiz.length} (${percent}%). ${percent >= 80 ? "সার্টিফিকেট প্রস্তুত: যাত্রী সেবা উৎকর্ষ সম্পন্ন।" : "দয়া করে মূল মানদণ্ড আবার দেখুন এবং আবার চেষ্টা করুন।"}`;
    document.getElementById("quizResult").textContent = activeLang === "hi" ? `${english} (${hi})` : activeLang === "bn" ? `${english} (${bn})` : english;
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
wireLanguagePicker();
wireCards();
buildQuiz();
wireControls();
updateSlideSubtitles();
goTo(0);
