const form = document.getElementById("candidateForm");
const previewBtn = document.getElementById("previewBtn");

const nameInput = document.getElementById("candidateName");
const emailInput = document.getElementById("candidateEmail");
const positionInput = document.getElementById("position");

const preview = document.getElementById("preview");
const previewSubject = document.getElementById("previewSubject");
const previewBody = document.getElementById("previewBody");

function getStatus() {
  return document.querySelector(
    'input[name="status"]:checked'
  ).value;
}

function validateForm() {

  let valid = true;

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("positionError").textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const position = positionInput.value.trim();

  if (name === "") {
    document.getElementById("nameError").textContent =
      "Candidate name is required.";
    valid = false;
  }

  if (email === "") {
    document.getElementById("emailError").textContent =
      "Candidate email is required.";
    valid = false;
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    document.getElementById("emailError").textContent =
      "Enter a valid email address.";
    valid = false;
  }

  if (position === "") {
    document.getElementById("positionError").textContent =
      "Position is required.";
    valid = false;
  }

  return valid;
}

function createEmail() {

  const name = nameInput.value.trim();
  const position = positionInput.value.trim();
  const status = getStatus();

  if (status === "Selected") {

    return {
      subject: "Congratulations! Selected for " + position,

      body:
`Dear ${name},

We are pleased to inform you that you have been selected for the position of ${position}.

Please reply to this email to confirm your acceptance.

Best regards,
HR Team`
    };

  } else {

    return {
      subject: "Application Update - " + position,

      body:
`Dear ${name},

Thank you for applying for the position of ${position}.

We regret to inform you that we have decided to move forward with other candidates.

Best regards,
HR Team`
    };
  }
}

function showPreview() {

  if (!validateForm()) {
    preview.classList.add("hidden");
    return false;
  }

  const email = createEmail();

  previewSubject.textContent = email.subject;
  previewBody.textContent = email.body;

  preview.classList.remove("hidden");

  return true;
}

previewBtn.addEventListener("click", function () {
  showPreview();
});

form.addEventListener("submit", function (event) {

  event.preventDefault();

  if (!showPreview()) {
    return;
  }

  const message = document.getElementById("message");

  message.textContent =
    "Preview generated. Click Send Email to send the response.";

  message.style.color = "#2563eb";
});