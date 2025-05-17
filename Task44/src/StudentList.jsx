import { useState } from "react";
import { students as studentData } from "./dataStudents";
export const StudentList = () => {
  const [search, setSearch] = useState("");
  const [avgFilter, setAvgFilter] = useState("");
  const [rankFilter, setRankFilter] = useState("");

  const calculateAvg = (s) =>
    ((s.math + s.literature + s.english) / 3).toFixed(2);

  const getRank = (avg) => {
    if (avg >= 8) return "Giỏi";
    if (avg >= 6.5) return "Khá";
    if (avg >= 5) return "Trung bình";
    return "Yếu";
  };

  const filteredStudents = studentData.filter((s) => {
    const avg = parseFloat(calculateAvg(s));
    const rank = getRank(avg);

    const matchName = s.name.toLowerCase().includes(search.toLowerCase());
    const matchAvg =
      avgFilter === ""
        ? true
        : avgFilter === ">=8"
        ? avg >= 8
        : avgFilter === ">=6.5"
        ? avg >= 6.5
        : avgFilter === "<5"
        ? avg < 5
        : true;

    const matchRank = rankFilter === "" ? true : rank === rankFilter;

    return matchName && matchAvg && matchRank;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sinh viên</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Tìm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={avgFilter}
          onChange={(e) => setAvgFilter(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">-- Lọc theo ĐTB --</option>
          <option value=">=8">Từ 8 trở lên</option>
          <option value=">=6.5">Tuừ 6,5 trở lên</option>
          <option value="<5">Dưới 5</option>
        </select>

        <select
          value={rankFilter}
          onChange={(e) => setRankFilter(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">-- Lọc theo học lực --</option>
          <option value="Giỏi">Giỏi</option>
          <option value="Khá">Khá</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Yếu">Yếu</option>
        </select>
      </div>

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Toán</th>
            <th>Văn</th>
            <th>Anh</th>
            <th>Điểm TB</th>
            <th>Học lực</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => {
            const avg = calculateAvg(s);
            const rank = getRank(avg);
            return (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.math}</td>
                <td>{s.literature}</td>
                <td>{s.english}</td>
                <td>{avg}</td>
                <td>{rank}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
