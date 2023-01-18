import { Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Stack, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import GetEmployees from "./Graphql/queries/GetEmployee";
import CreateEmployeeForm from "./Components/CreateEmployeeForm/CreateEmployeeForm";
import EditEmployeeForm from "./Components/EditEmployeeForm/EditEmployeeForm";
import { useEmployee } from "./Providers/EmployeeProvider";

function App() {
  const [isCreateEmployeeOpen, setIsCreateEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const { employee } = useEmployee();

  return (
    <>
      <Box position="fixed" height="100vh" width="100vw">
        <Stack
          direction="row"
          width="50%"
          justifyContent="space-around"
          align-items="center"
          columnGap="2em"
        >
          <Button onClick={() => setIsCreateEmployeeOpen(true)}>
            Create Employee
          </Button>
          <Button onClick={() => setIsEditEmployeeOpen(true)}>
            Edit Employee
          </Button>
        </Stack>
      </Box>
      <Dialog
        open={isCreateEmployeeOpen}
        onClose={() => setIsCreateEmployeeOpen(false)}
      >
        <DialogTitle>Create Employee</DialogTitle>
        <DialogContent>
          <CreateEmployeeForm />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isEditEmployeeOpen}
        onClose={() => setIsEditEmployeeOpen(false)}
      >
        <DialogTitle>Editing {employee.name}</DialogTitle>
        <DialogContent>
          <EditEmployeeForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
