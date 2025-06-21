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

      const fields = [
        "Vị trí/ cấp bậc", "Nhân sự", "Rank", "Lương CD", "Lương thử việc",
        "Lương HS", "Lương trách nhiệm School", "Lương trách nhiệm Space",
        "Công chuẩn", "KPI HV", "Hệ số/ HSHS",
        "SL Sale/BU < 60%/SL HV RF/SL feedback PH",
        "Số lượng WS", "SL Họp PH", "% HV WS",
        "SL Call/ SL L4 Tele/SL Học viên Afterschool",
        "% Thực đạt KPI", "% Thực đạt BU/ % Refund/% feedback",
        "% Thực đạt CR/% Thưởng CSKH", "% Thưởng WS",
        "Thực đạt KPI1", "Thực đạt KPI2", "Thực đạt KPI3",
        "Doanh số", "Doanh số bị trừ", "Doanh số 1 + 2",
        "Doanh số 1", "Doanh số 2", "Doanh số 3",
        "Công thực tế", "Công chính thức", "Công thử việc",
        "Lương CB theo ngày công", "Lương HS", "Lương trách nhiệm School",
        "Lương trách nhiệm Space",
        "Thưởng nguồn 1/ Thưởng CS/Team Tele MKT/ L4 DR MKT",
        "Thưởng nguồn 2/ Thưởng WS/ Thưởng L6 Tele MKT/ DR MKT",
        "Thưởng nguồn 3/ Thưởng Admin/ Thưởng CCR CSL",
        "Thưởng hiệu quả công việc 2024", "Thưởng cống hiến",
        "Thưởng Top WS/Thưởng SociakMKT", "Thưởng Pushsale các team",
        "Thưởng Space", "Bổ sung lương", "Khác", "Tổng lương"
      ];

      let html = `<table><tbody>`;
      fields.forEach(field => {
        html += `<tr><th>${field}</th><td>${data[field] || ""}</td></tr>`;
      });
      html += `</tbody></table>`;
      resultDiv.innerHTML = html;
    })
    .catch(error => {
      document.getElementById("result").innerHTML = `<p style="color: red;">Lỗi khi kết nối tới server.</p>`;
      console.error(error);
    });
});
