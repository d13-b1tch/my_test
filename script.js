function saveFormData(formId, key) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {};
    new FormData(form).forEach((v, k) => data[k] = v);
    localStorage.setItem(key, JSON.stringify(data));
    alert("Данные сохранены!");
  });
}

if (document.getElementById("userForm")) saveFormData("userForm", "userData");
if (document.getElementById("partnerForm")) saveFormData("partnerForm", "partnerData");

if (document.getElementById("result")) {
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const partner = JSON.parse(localStorage.getItem("partnerData") || "{}");
  let score = 0, total = 0, report = "";
  for (let key in user) {
    if (partner[key]) {
      total++;
      if (user[key] === partner[key]) score++;
      else report += `<p><b>${key}:</b> различие — ${user[key]} / ${partner[key]}</p>`;
    }
  }
  const percent = total ? Math.round((score / total) * 100) : 0;
  document.getElementById("result").innerHTML = `<h2>Совместимость: ${percent}%</h2>` + report;
}

function downloadResult() {
  const el = document.getElementById("result");
  html2canvas(el).then(canvas => {
    const link = document.createElement("a");
    link.download = "compatibility_result.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
