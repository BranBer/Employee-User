import { gql } from "@apollo/client";

const CreateEmployee = gql`
  mutation EditEmployee($employeeId: String!, $newName: String!) {
    EditEmployee(input: { employeeId: $employeeId, newName: $newName }) {
      id
      name
      yearlyBenefitsCost
      dependents {
        id
        name
      }
    }
  }
`;

export default CreateEmployee;
