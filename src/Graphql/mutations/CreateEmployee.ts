import { gql } from "@apollo/client";

const CreateEmployee = gql`
  mutation CreateEmployee($name: String!) {
    CreateEmployee(input: { name: $name }) {
      id
      name
      yearlyBenefitsCost
      dependents {
        name
        id
      }
    }
  }
`;

export default CreateEmployee;
