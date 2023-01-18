import { gql } from "@apollo/client";

const AddDependent = gql`
  mutation AddDependent($employeeId: String!, $name: String!) {
    AddDependent(input: { employeeId: $employeeId, dependentName: $name }) {
      dependents {
        id
        name
      }
      id
      name
    }
  }
`;

export default AddDependent;
