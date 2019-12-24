import { filterOperationFactory } from "@listr/strategies/layoutFilter";
import { OperationTypes } from "@Types/inquirer/operationTypes";
import { filterByInstanceStrategy } from "@listr/strategies/layoutFilter/filterByInstanceStrategy";
import { filterByBothStrategy } from "@listr/strategies/layoutFilter/filterByBothStrategy";

describe("layouts filter Strategies", () => {
  describe("filterOperationFactory", () => {
    it("should be defined", async () => {
      expect(filterOperationFactory).toBeTruthy();
    });

    it("should return filterByInstanceStrategy.", async () => {
      let filter = filterOperationFactory(OperationTypes.removeInstance);
      expect(filter).toEqual(filterByInstanceStrategy);

      filter = filterOperationFactory(OperationTypes.replaceInstance);
      expect(filter).toEqual(filterByInstanceStrategy);

      filter = filterOperationFactory(OperationTypes.insertInstanceBefore);
      expect(filter).toEqual(filterByInstanceStrategy);

      filter = filterOperationFactory(OperationTypes.insertInstanceAfter);
      expect(filter).toEqual(filterByInstanceStrategy);
    });

    it("should return filterByBothStrategy.", async () => {
      let filter = filterOperationFactory(OperationTypes.moveInstanceBefore);
      expect(filter).toEqual(filterByBothStrategy);

      filter = filterOperationFactory(OperationTypes.moveInstanceAfter);
      expect(filter).toEqual(filterByBothStrategy);
    });
  });
});
