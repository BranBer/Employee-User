import { gql } from "@apollo/client";

const GetEmployee = gql`
  query GetEmployee($id: String!) {
    GetEmployee(input: { id: $id }) {
      dependents {
        id
        name
      }
      id
      name
      numberOfPaychecks
      paycheck
      yearlyBenefitsCost
    }
  }
`;

export default GetEmployee;
