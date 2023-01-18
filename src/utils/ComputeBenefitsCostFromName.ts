import ComputeNameDiscount from "./ComputeNameDiscount";

const ComputeBenefitsCostFromName = (name: string): number => {
  return 500 * ComputeNameDiscount(name);
};

export default ComputeBenefitsCostFromName;
