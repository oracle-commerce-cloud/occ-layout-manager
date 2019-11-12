import { useApi } from "../../src/api";
import mockAxios from "jest-mock-axios";

const { node, applicationKey } = process.env;
const client = useApi({ node, applicationKey });

describe("useApi", () => {
  describe("create client", () => {
    it("should be able to create client without crashing", () => {
      expect(client).toBeTruthy();
    });

    it("should implement the UseApi interface", () => {
      expect(client.login).toBeTruthy();
      expect(client.listLayouts).toBeTruthy();
      expect(client.listInstances).toBeTruthy();
      expect(client.getLayoutStructure).toBeTruthy();
      expect(client.saveLayoutStructure).toBeTruthy();
    });
  });

  describe("client should be singleton", () => {
    it("get the same instance for the same applicationKey", () => {
      const client2 = useApi({ node, applicationKey });
      expect(client).toEqual(client2);
    });

    it("get a new instance for new applicationKey", () => {
      const client2 = useApi({ node: "test", applicationKey: "test" });
      expect(client).not.toEqual(client2);
    });
  });
});
