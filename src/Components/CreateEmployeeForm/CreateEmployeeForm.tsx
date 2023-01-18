import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import CreateEmployee from "../../Graphql/mutations/CreateEmployee";
import { FormControl, TextField, Button, Alert } from "@mui/material";
import { useEmployee } from "../../Providers/EmployeeProvider";

const CreateEmployeeForm = () => {
  const [createEmployee, { data, loading, error }] =
    useMutation(CreateEmployee);

  const { setEmployee } = useEmployee();

  const [name, setName] = useState("");

  return (
    <>
      <FormControl>
        <TextField
          onChange={(e) => setName(e.target.value)}
          label="Name"
        ></TextField>
        <Button
          onClick={() => {
            createEmployee({
              variables: {
                name,
              },
            }).then(({ data }) => {
              setEmployee(data.CreateEmployee);
            });
          }}
        >
          Submit
        </Button>
      </FormControl>

      {data && !error ? (
        <Alert severity="success">You Created an Employee!</Alert>
      ) : null}
    </>
  );
};

export default CreateEmployeeForm;
