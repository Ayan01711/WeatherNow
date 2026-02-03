// ===== MOBILE SEARCH =====
const mobileInput = document.getElementById("mobileSearchCity");

mobileInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    getWeather(mobileInput.value);
  }
});
