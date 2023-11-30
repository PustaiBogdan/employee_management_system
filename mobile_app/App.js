import React, { useState } from "react";
import { View, Button, Alert, FlatList, Text } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const App = () => {
  const styles = {
    row: {
      flexDirection: "row",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#dedede",
      backgroundColor: "#f9f9f9",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tableHeader: {
      flexDirection: "row",
      padding: 20,
      backgroundColor: "#5D1049", // o culoare mai aprinsă pentru antet
      borderBottomWidth: 2,
      borderBottomColor: "#e0e0e0",
    },
    headerCell: {
      flex: 1,
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
    },
    cell: {
      flex: 1,
      textAlign: "center",
      color: "#333",
    },
    button: {
      marginTop: 20,
      backgroundColor: "#5D1049",
      padding: 15,
      borderRadius: 8,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
    },
    picker: {
      marginVertical: 20,
      padding: 15,
      backgroundColor: "#e0e0e0",
      borderRadius: 8,
    },
  };

  const [managers, setManagers] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const backendURL = "http://192.168.100.24:8080/api/v1";

  const handleGetManagers = async () => {
    try {
      const response = await axios.get(`${backendURL}/managers`);
      console.log("Get All Managers Response:", response.data);
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const TableHeader = () => {
    return (
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Prenume</Text>
        <Text style={styles.headerCell}>Nume</Text>
        <Text style={styles.headerCell}>Email</Text>
      </View>
    );
  };

  const [employees, setEmployees] = useState([]);
  const handleGetDepartments = async () => {
    try {
      const response = await axios.get(`${backendURL}/departments`);
      console.log("Get All Departments Response:", response.data);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const renderEmployeeItem = ({ item }) => {
    console.log("Detalii angajat:", item); // Afișează detalii la consolă
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.firstName}</Text>
        <Text style={styles.cell}>{item.lastName}</Text>
        <Text style={styles.cell}>{item.emailId}</Text>
      </View>
    );
  };

  const handleSendEmailsToAllEmployees = async () => {
    for (const employee of employees) {
      try {
        const emailData = {
          to: employee.emailId,
          subject: "Subiectul Email-ului",
          body: "Corpul Email-ului",
        };

        console.log(emailData);
        axios.post(`${backendURL}/sendEmail`, emailData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error(`Error sending email to ${employee.emailId}:`, error);
      }
    }
  };

  const handleGetEmployeesByManager = async () => {
    if (!selectedManagerId) return;

    try {
      const response = await axios.get(
        `${backendURL}/users/manager/${selectedManagerId}`
      );
      console.log("Get Employees by Manager Response:", response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees by manager:", error);
    }
  };

  const handleGetEmployeesByDepartment = async () => {
    if (!selectedDepartmentId) return;

    try {
      const response = await axios.get(
        `${backendURL}/users/department/${selectedDepartmentId}`
      );
      console.log("Get Employees by Department Response:", response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees by department:", error);
    }
  };

  return (
    <View>
      <Button title="" />
      <Button title="" />

      <Button title="Get All Managers" onPress={handleGetManagers} />
      <Button title="Get All Departments" onPress={handleGetDepartments} />
      {/* Picker Component for Selecting Managers */}
      <Picker
        selectedValue={selectedManagerId}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedManagerId(itemValue)
        }
      >
        {managers.map((manager, index) => (
          <Picker.Item
            key={index}
            label={`${manager.firstName} ${manager.lastName}`}
            value={manager.id}
          />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedDepartmentId}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedDepartmentId(itemValue)
        }
      >
        {departments.map((department, index) => (
          <Picker.Item
            key={index}
            label={department.description}
            value={department.id}
          />
        ))}
      </Picker>
      <Button
        title="Get Employees by Selected Department"
        onPress={handleGetEmployeesByDepartment}
      />

      <Button
        title="Get Employees by Selected Manager"
        onPress={handleGetEmployeesByManager}
      />
      <TableHeader />
      <FlatList
        data={employees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Button
        title="Send Emails to All Employees"
        onPress={handleSendEmailsToAllEmployees}
        color="#5D1049" // Acesta va seta culoarea butonului pe Android
      />
    </View>
  );
};

export default App;
