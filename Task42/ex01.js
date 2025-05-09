const students = JSON.parse(localStorage.getItem("students")) || [
  { id: "s1", name: "Toro", math: 8, english: 7, science: 6 },
  { id: "s2", name: "Ly Tieu Long", math: 4, english: 3, science: 5 },
  { id: "s3", name: "Donal Trump", math: 9, english: 9, science: 10 },
];

function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
  renderUI();
}

function loadStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function calculateAverageAndLevel(student) {
  const avg = (student.math + student.english + student.science) / 3;
  student.avg = avg;
  if (avg >= 8) student.level = "Giỏi";
  else if (avg >= 6.5) student.level = "Khá";
  else if (avg >= 5) student.level = "Trung bình";
  else student.level = "Yếu";
}

function renderUI(data = null) {
  const studentTable = document.getElementById("studentTable");
  const dataToRender = data || loadStudents();
  studentTable.innerHTML = "";

  dataToRender.forEach((student) => {
    calculateAverageAndLevel(student);
    studentTable.innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.math}</td>
                    <td>${student.english}</td>
                    <td>${student.science}</td>
                    <td>${student.avg.toFixed(2)}</td>
                    <td>${student.level}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editStudent('${
                          student.id
                        }')">Sửa</button>
                        <button class="btn btn-danger" onclick="deleteStudent('${
                          student.id
                        }')">Xóa</button>
                    </td>
                </tr>
            `;
  });
}

function generateId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function addStudent(student) {
  student.id = generateId();
  students.push(student);
  saveToLocalStorage();
}

function addStudentFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const math = parseFloat(document.getElementById("math").value);
  const english = parseFloat(document.getElementById("english").value);
  const science = parseFloat(document.getElementById("science").value);

  if (
    name &&
    !isNaN(math) &&
    !isNaN(english) &&
    !isNaN(science) &&
    math >= 0 &&
    math <= 10 &&
    english >= 0 &&
    english <= 10 &&
    science >= 0 &&
    science <= 10
  ) {
    addStudent({ name, math, english, science });
    document.getElementById("studentForm").reset();
  } else {
    alert("Vui lòng nhập đầy đủ và chính xác dữ liệu!");
  }
}

function editStudent(id) {
  const student = students.find((s) => s.id === id);
  document.getElementById("name").value = student.name;
  document.getElementById("name").readOnly = true;
  document.getElementById("math").value = student.math;
  document.getElementById("english").value = student.english;
  document.getElementById("science").value = student.science;
  document.getElementById("addBtn").innerText = "Cập nhật";
  document.getElementById("title").innerText = "Sửa điểm sinh viên";

  document.getElementById("studentForm").onsubmit = function (event) {
    event.preventDefault();
    student.math = parseFloat(document.getElementById("math").value);
    student.english = parseFloat(document.getElementById("english").value);
    student.science = parseFloat(document.getElementById("science").value);
    saveToLocalStorage();
    document.getElementById("studentForm").reset();
    document.getElementById("name").readOnly = false;
    document.getElementById("addBtn").innerText = "Thêm sinh viên";
    document.getElementById("title").innerText = "Thêm sinh viên";
    document.getElementById("studentForm").onsubmit = addStudentFormSubmit;
  };
}

function deleteStudent(id) {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sinh viên này?");
  if (confirmDelete) {
    const index = students.findIndex((s) => s.id === id);
    if (index !== -1) {
      students.splice(index, 1);
      saveToLocalStorage();
    }
  }
}

function searchStudents(event) {
  const searchTerm = event.target.value.toLowerCase();
  const students = loadStudents();
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm)
  );
  renderUI(filteredStudents);
}

function sortStudents(event) {
  const sortOrder = event.target.value;
  let students = loadStudents();
  students.forEach(calculateAverageAndLevel);

  if (sortOrder === "asc") {
    students.sort((a, b) => a.avg - b.avg);
  } else if (sortOrder === "desc") {
    students.sort((a, b) => b.avg - a.avg);
  }

  renderUI(students);
}

function filterStudents(event) {
  const filter = event.target.value;
  let students = loadStudents();
  students.forEach(calculateAverageAndLevel);

  if (filter) {
    const filtered = students.filter((s) => s.level === filter);
    renderUI(filtered);
  } else {
    renderUI();
  }
}

function setupEventListeners() {
  document.getElementById("studentForm").onsubmit = addStudentFormSubmit;
  document
    .getElementById("searchInput")
    .addEventListener("input", searchStudents);
  document
    .getElementById("sortSelect")
    .addEventListener("change", sortStudents);
  document
    .getElementById("filterSelect")
    .addEventListener("change", filterStudents);
}

setupEventListeners();
renderUI();
