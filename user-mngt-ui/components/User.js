import React from "react";
import { Button } from "./Button";
import TableCell from "./TableCell";

const User = ({ user, deleteUser, editUser, departmentName, managerName }) => {
  const labels = [
    `${user.firstName} ${user.lastName}`,
    user.lastName,
    user.emailId,
    managerName,
    departmentName,
  ];
  console.log(user);

  return (
    <tr key={user.id}>
      {labels.map((label, index) => (
        <TableCell key={index} label={label} />
      ))}
      <td className="text-right px-6 py-4 whitespace-nowrap">
        <Button onClick={(e, id) => editUser(e, user.id)} label={"Edit"} />
        <Button onClick={(e, id) => deleteUser(e, user.id)} label={"Delete"} />
      </td>
    </tr>
  );
};

export default User;
