import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import EditEmployee from "../../Graphql/mutations/EditEmployee";
import AddDependent from "../../Graphql/mutations/AddDependent";
import {
  FormControl,
  TextField,
  Button,
  Alert,
  Stack,
  Chip,
  Typography,
} from "@mui/material";
import RemoveDependent from "../../Graphql/mutations/RemoveDependent";
import { useEmployee } from "../../Providers/EmployeeProvider";
import GetEmployee from "../../Graphql/queries/GetEmployee";
import ComputeNameDiscount from "../../utils/ComputeNameDiscount";
import ComputeBenefitsCostFromName from "../../utils/ComputeBenefitsCostFromName";

const EditEmployeeForm = () => {
  const { employee, setEmployee } = useEmployee();
  const [editEmployee, { data: eData }] = useMutation(EditEmployee);

  const [addDependent, { data: dData }] = useMutation(AddDependent);

  const [removeDependent, { data: rData }] = useMutation(RemoveDependent);
  const [getEmployee] = useLazyQuery(GetEmployee);

  const [name, setName] = useState("");
  const [newDependentName, setNewDependentName] = useState("");

  const newNameAccrual = 1000 - 1000 * ComputeNameDiscount(name);
  const newDependentAccrual = ComputeBenefitsCostFromName(newDependentName);

  return (
    <>
      <FormControl>
        <Typography>
          Current Yearly Cost of Benefits: {employee.yearlyBenefitsCost}
        </Typography>
        <Stack direction={"row"} justifyContent="space-between">
          <TextField
            onChange={(e) => setName(e.target.value)}
            label="Name"
            value={name}
          ></TextField>
          {name && newNameAccrual ? (
            <Typography>
              {newNameAccrual > 0 ? `+${newNameAccrual}` : `-${newNameAccrual}`}
            </Typography>
          ) : null}
        </Stack>
        <Button
          onClick={() => {
            editEmployee({
              variables: {
                employeeId: employee.id,
                name: name,
              },
            }).then(() => {
              getEmployee({
                variables: {
                  id: employee.id,
                },
              }).then(({ data }) => {
                setEmployee(data.GetEmployee);
              });
            });
          }}
        >
          Change Name
        </Button>
        <Stack>
          <TextField
            onChange={(e) => setNewDependentName(e.target.value)}
            value={newDependentName}
            label="Dependent name"
          ></TextField>
          {newDependentName && newDependentAccrual ? (
            <Typography>
              {newDependentAccrual > 0
                ? `+${newDependentAccrual}`
                : `-${newDependentAccrual}`}
            </Typography>
          ) : null}
        </Stack>
        <Button
          onClick={() => {
            addDependent({
              variables: {
                employeeId: employee.id,
                name: newDependentName,
              },
            }).then(() => {
              getEmployee({
                variables: {
                  id: employee.id,
                },
              }).then(({ data }) => {
                setEmployee(data.GetEmployee);
              });
            });
          }}
        >
          Add Dependent
        </Button>
        {employee && employee.dependents.length ? (
          <Stack
            direction="row"
            flexWrap="wrap"
            rowGap="1em"
            columnGap="1em"
            width="100%"
          >
            {employee.dependents.map((d) => (
              <Chip
                key={d.id}
                label={d.name}
                onDelete={() => {
                  console.log(d);
                  removeDependent({ variables: { dependentId: d.id } }).then(
                    () => {
                      getEmployee({
                        variables: {
                          id: employee.id,
                        },
                      }).then(({ data }) => {
                        setEmployee(data.GetEmployee);
                      });
                    }
                  );
                }}
              />
            ))}
          </Stack>
        ) : null}
      </FormControl>
      {eData ? (
        <Alert severity="success">
          You have changed the name of your Employee
        </Alert>
      ) : null}
      {rData ? (
        <Alert severity="success">
          You have successfully removed a dependent
        </Alert>
      ) : null}
      {dData ? (
        <Alert severity="success">
          You have successfully added a dependent
        </Alert>
      ) : null}
    </>
  );
};

export default EditEmployeeForm;
