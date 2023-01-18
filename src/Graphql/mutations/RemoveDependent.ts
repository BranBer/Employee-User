import { gql } from "@apollo/client";

const RemoveDependent = gql`
  mutation RemoveDependent($dependentId: String!) {
    RemoveDependent(input: { dependentId: $dependentId })
  }
`;

export default RemoveDependent;
