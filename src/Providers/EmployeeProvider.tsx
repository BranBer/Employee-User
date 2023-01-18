import React, { useContext, useState, createContext } from "react";

interface dependent {
  name: string;
  id: string;
}

interface Employee {
  name: string;
  yearlyBenefitsCost: number;
  id: string;
  dependents: dependent[];
}

interface IEmployeeContext {
  employee: Employee;
  setEmployee: any;
}

const EmployeeContext = createContext({} as IEmployeeContext);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employee, setEmployee] = useState<Employee>({} as Employee);

  console.log(employee);
  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  return useContext(EmployeeContext);
};
