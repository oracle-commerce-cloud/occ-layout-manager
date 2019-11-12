import { useApi } from "../../src/api";
import mockAxios from "jest-mock-axios";

import listInstancesResponse from "../mock/listInstancesResponse.json";
import listInstancesResult from "../mock/listInstances.json";

const { node, applicationKey } = process.env || { node: "https://test.com", applicationKey: "hhhhh" };
const { listInstances } = useApi({ node, applicationKey });

describe("useApi.listInstances", () => {
  it("should be defined", async () => {
    expect(listInstances).toBeTruthy();
  });

  it("get all widget descriptors along with their associated instances.", async () => {
    const catchFn = jest.fn((err) => console.trace(err));
    const thenFn = jest.fn();

    // using the component, which should make a server response

    const promise = listInstances()
      .then(thenFn)
      .catch(catchFn);

    // since `get` method is a spy, we can check if the server request was correct
    // a) the correct method was used (get)
    // b) went to the correct Endpoint URL ('/widgetDescriptors/instances')
    expect(mockAxios.get).toHaveBeenCalledWith("/widgetDescriptors/instances");

    // simulating a server response
    mockAxios.mockResponse({ data: listInstancesResponse });

    await promise;

    // checking the `then` spy has been called and if the
    // response from the server was converted to upper case
    expect(thenFn).toHaveBeenCalledWith(listInstancesResult);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });
});
