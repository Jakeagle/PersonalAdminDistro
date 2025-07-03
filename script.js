"use strict";

document.getElementById("poForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const schoolName = document.getElementById("schoolName").value;
  const schoolDistrict = document.getElementById("schoolDistrict").value;
  const poNumber = document.getElementById("poNumber").value;
  const studentQty = document.getElementById("studentQty").value;
  const teacherQty = document.getElementById("teacherQty").value;
  const teacherLicenseTotal = document.getElementById(
    "teacherLicenseTotal"
  ).value;
  const studentLicenseTotal = document.getElementById(
    "studentLicenseTotal"
  ).value;
  const totalPurchasePrice =
    document.getElementById("totalPurchasePrice").value;
  const adminEmail = document.getElementById("adminEmail").value;

  const emailBody = `
Hello,

Thank you for your recent purchase of Trinity Capital licenses.

Here are the details of your order:
School Name: ${schoolName}
School District: ${schoolDistrict}
PO Number: ${poNumber}
Student Licenses: ${studentQty}
Teacher Licenses: ${teacherQty}
Teacher License Total: $${teacherLicenseTotal}
Student License Total: $${studentLicenseTotal}
Total Purchase Price: $${totalPurchasePrice}

To begin distributing licenses to your teachers, please visit the following secure portal:
https://trincaplicensedist.netlify.app

Once there, enter your email address to access your license distribution dashboard. From this page, you can send individual access codes and instructions to each teacher.

If you have any questions, please contact us at support@trinitycapapp.com.

Sincerely,
Trinity Capital EdTech Solutions
`;

  // Show confirmation (simulate sending)
  document.getElementById("confirmation").style.display = "block";
  document.getElementById("confirmation").innerText =
    "Instructions prepared. Email this message to: " +
    adminEmail +
    "\n\n" +
    emailBody.replace(/\n/g, "\n");

  // In a real app, you would send this email via server or API
});

const SERVER_BASE_URL =
  "https://tcpurchasingserver-production.up.railway.app";

function sendParcelPost(
  schoolName,
  schoolDistrict,
  poNumber,
  studentQty,
  teacherQty,
  teacherLicenseTotal,
  studentLicenseTotal,
  totalPurchasePrice,
  adminEmail
) {
  fetch(SERVER_BASE_URL + "/send-parcel-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      schoolName,
      schoolDistrict,
      poNumber,
      studentQty,
      teacherQty,
      teacherLicenseTotal,
      studentLicenseTotal,
      totalPurchasePrice,
      adminEmail,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("POST response:", data);
    })
    .catch((error) => {
      console.error("POST error:", error);
    });
}

const submitBtn = document.querySelector(".submitBtn");
submitBtn.addEventListener("click", function () {
  console.log("Submit button clicked");

  // Grab form input values directly from the DOM
  const schoolName = document.getElementById("schoolName").value.trim();
  const schoolDistrict = document.getElementById("schoolDistrict").value.trim();
  const poNumber = document.getElementById("poNumber").value.trim();
  const studentQty = parseInt(document.getElementById("studentQty").value);
  const teacherQty = parseInt(document.getElementById("teacherQty").value);
  const teacherLicenseTotal = parseFloat(
    document.getElementById("teacherLicenseTotal").value
  );
  const studentLicenseTotal = parseFloat(
    document.getElementById("studentLicenseTotal").value
  );
  const totalPurchasePrice = parseFloat(
    document.getElementById("totalPurchasePrice").value
  );
  const adminEmail = document.getElementById("adminEmail").value.trim();

  // Now call the sendParcelPost function with actual values
  sendParcelPost(
    schoolName,
    schoolDistrict,
    poNumber,
    studentQty,
    teacherQty,
    teacherLicenseTotal,
    studentLicenseTotal,
    totalPurchasePrice,
    adminEmail
  );
  console.log("sendParcelPost function called");
});

// Example usage (call this after form submission):
// sendParcelPost(schoolName, schoolDistrict, poNumber, studentQty, teacherQty, teacherLicenseTotal, studentLicenseTotal, totalPurchasePrice, adminEmail);
