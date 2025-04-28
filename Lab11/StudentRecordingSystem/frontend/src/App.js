import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/students");
    setStudents(response.data);
  };

  const addStudent = async (formData) => {
    await axios.post("http://localhost:5000/api/students", formData);
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div>
    <div
      className="container text-center"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Added to ensure children are centered within the div
        color: 'white',
      }}
    >
      <h1>Student Recording System</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} deleteStudent={deleteStudent} />
    </div>
    </div>
  );
};

export default App;

