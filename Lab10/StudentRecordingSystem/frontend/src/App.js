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
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (formData) => {
    try {
      await axios.post("http://localhost:5000/api/students", formData);
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container text-center">
      <h1>Student Recording System</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} deleteStudent={deleteStudent} />
    </div>
  );
};

export default App;
