// Run code when the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Sign-Up Functionality
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value;
            let matric = document.getElementById("matric").value;
            let password = document.getElementById("password").value;

            if (!name || !matric || !password) {
                alert("All fields are required!");
                return;
            }

            // Save user data in localStorage
            localStorage.setItem("userName", name);  // Save name (not used for login)
            localStorage.setItem("userMatric", matric.trim()); // Save Matric Number
            localStorage.setItem("userPassword", password.trim()); // Save Password

            alert("Sign-up successful! You can now log in.");
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Login Functionality
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let matric = document.getElementById("matric").value.trim(); // Trim input
            let password = document.getElementById("password").value.trim(); // Trim input

            // Retrieve stored user data
            let storedMatric = localStorage.getItem("userMatric");
            let storedPassword = localStorage.getItem("userPassword");

            console.log("Stored Matric:", storedMatric); // Debugging
            console.log("Input Matric:", matric); // Debugging

            if (!storedMatric || !storedPassword) {
                alert("No account found! Please sign up first.");
                return;
            }

            if (matric === storedMatric && password === storedPassword) {
                alert("Login successful!");
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                alert("Invalid login details. Please try again.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");

    if (profileForm) {
        // Load Profile Data
        document.getElementById("name").value = localStorage.getItem("userName") || "";
        document.getElementById("matric").value = localStorage.getItem("userMatric") || "";
        document.getElementById("password").value = localStorage.getItem("userPassword") || "";

        // Update Profile Data
        profileForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!name || !password) {
                alert("All fields are required!");
                return;
            }

            // Save updated data in localStorage
            localStorage.setItem("userName", name);
            localStorage.setItem("userPassword", password);

            alert("Profile updated successfully!");

            document.addEventListener("DOMContentLoaded", function () {
                // Sample attendance data (Replace this with real data from backend)
                let totalStudents = 100;
                let presentToday = 75;
                let absentToday = totalStudents - presentToday;
            
                // Update dashboard numbers
                document.getElementById("totalStudents").innerText = totalStudents;
                document.getElementById("presentToday").innerText = presentToday;
                document.getElementById("absentToday").innerText = absentToday;
            
                // Sample recent attendance data
                let recentAttendance = [
                    { id: 1, name: "John Doe", matric: "BU1234", status: "Present", time: "08:30 AM" },
                    { id: 2, name: "Jane Smith", matric: "BU5678", status: "Absent", time: "—" },
                    { id: 3, name: "Mike Johnson", matric: "BU9101", status: "Present", time: "08:35 AM" }
                ];
            
                // Populate the attendance table
                let tableBody = document.getElementById("attendanceTable");
                recentAttendance.forEach((student) => {
                    let row = `<tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.matric}</td>
                        <td class="${student.status === "Present" ? "text-success" : "text-danger"}">${student.status}</td>
                        <td>${student.time}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            
                // Bar Chart Data
                let barChart = new Chart(document.getElementById("barChart"), {
                    type: "bar",
                    data: {
                        labels: ["Total Students", "Present", "Absent"],
                        datasets: [
                            {
                                label: "Attendance Summary",
                                data: [totalStudents, presentToday, absentToday],
                                backgroundColor: ["#007bff", "#28a745", "#dc3545"],
                            },
                        ],
                    },
                });
            
                // Pie Chart Data
                let pieChart = new Chart(document.getElementById("pieChart"), {
                    type: "pie",
                    data: {
                        labels: ["Present", "Absent"],
                        datasets: [
                            {
                                data: [presentToday, absentToday],
                                backgroundColor: ["#28a745", "#dc3545"],
                            },
                        ],
                    },
                });
            });
            
        });
    }
});
