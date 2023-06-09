const bornDay = document.querySelector("#inputDay");
const bornMonth = document.querySelector("#inputMonth");
const bornYear = document.querySelector("#inputYear");
const button = document.querySelector("button");
const resultDays = document.querySelector("#days");
const resultMonths = document.querySelector("#months");
const resultYears = document.querySelector("#years");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const errors = document.querySelectorAll(".error");
const resultInputs = document.querySelectorAll(".purple");

button.addEventListener("click", () => {
  resetStyles();
  checkInputs();
  checkNumbers();
  calculate();
  checkValues();
});

function resetStyles() {
  labels.forEach((label) => {
    label.style.color = "var(--Smokey-grey)";
  });
  errors.forEach((error) => {
    error.style.display = "none";
    error.textContent = "";
  });
}

function checkInputs() {
  inputs.forEach((input) => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    const errorMsg = document.getElementById(`${input.id}Error`);
    if (!+input.value) {
      label.style.color = "var(--Light-red)";
      errorMsg.style.display = "flex";
      errorMsg.textContent = "This field must be a number";
    }
    if (input.value === "") {
      label.style.color = "var(--Light-red)";
      errorMsg.style.display = "flex";
      errorMsg.textContent = "This field is required";
    }
  });
}

function checkNumbers() {
  if (
    bornDay.value < 0 ||
    bornDay.value > 31 ||
    bornDay.value > checkDaysInMonth()
  ) {
    document.querySelector('label[for="inputDay"]').style.color =
      "var(--Light-red)";
    document.getElementById("inputDayError").style.display = "flex";
    document.getElementById("inputDayError").textContent =
      "Must be a valid day";
  }
  if (bornMonth.value < 0 || bornMonth.value > 12) {
    document.querySelector('label[for="inputMonth"]').style.color =
      "var(--Light-red)";
    document.getElementById("inputMonthError").style.display = "flex";
    document.getElementById("inputMonthError").textContent =
      "Must be a valid month";
  }
  if (bornYear.value < 0 || bornYear.value > new Date().getFullYear()) {
    document.querySelector('label[for="inputYear"]').style.color =
      "var(--Light-red)";
    document.getElementById("inputYearError").style.display = "flex";
    document.getElementById("inputYearError").textContent =
      "Must be a valid year";
  }
}

function calculate() {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  let yearDiff = year - bornYear.value;
  let monthDiff = month - bornMonth.value;
  if (monthDiff <= 0) {
    yearDiff--;
    monthDiff += 12;
  }
  let dayDiff = day - bornDay.value;
  if (dayDiff <= 0) {
    monthDiff--;
    dayDiff += 31;
  }

  resultYears.innerText = yearDiff;
  resultMonths.innerText = monthDiff;
  resultDays.innerText = dayDiff;
}

function checkValues() {
  const inputYear = document.getElementById("inputYearError");
  const inputMonth = document.getElementById("inputMonthError");
  const inputDay = document.getElementById("inputDayError");

  if (
    inputDay.textContent !== "" ||
    inputMonth.textContent !== "" ||
    inputYear.textContent !== ""
  ) {
    resultYears.innerText = "--";
    resultMonths.innerText = "--";
    resultDays.innerText = "--";
  }
}

function checkDaysInMonth() {
  const year = bornYear.value;
  const month = bornMonth.value;
  return new Date(year, month, 0).getDate();
}
