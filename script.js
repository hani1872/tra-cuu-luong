document.getElementById("salaryForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const msnv = document.getElementById("msnv").value.trim();
  const matkhau = document.getElementById("matkhau").value.trim();

  if (!msnv || !matkhau) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  const apiUrl = "https://script.google.com/macros/s/AKfycbxMrvZuKJQQFcRpc-xr1k285wxEefxrj1XcRNUjYqL1H4zHHtloFhn3dwf1JYCkHyz3Uw/exec";

  fetch(`${apiUrl}?msnv=${encodeURIComponent(msnv)}&matkhau=${encodeURIComponent(matkhau)}`)
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      if (data.error) {
        resultDiv.innerHTML = `<p style="color: red; font-weight: bold;">${data.error}</p>`;
        return;
      }

      let html = `<table><tbody>`;
      for (const key in data) {
        html += `<tr><th>${key}</th><td>${data[key]}</td></tr>`;
      }
      html += `</tbody></table>`;
      resultDiv.innerHTML = html;
    })
    .catch(error => {
      document.getElementById("result").innerHTML = `<p style="color: red;">Lỗi khi kết nối tới server.</p>`;
      console.error(error);
    });
});
