import { useApi } from "@api";
import mockAxios from "jest-mock-axios";

import listLayoutsResponse from "../mock/listLayoutsResponse.json";
import listLayoutsResult from "../mock/listLayouts.json";

const { node, applicationKey } = process.env || { node: "https://test.com", applicationKey: "hhhhh" };
const { listLayouts } = useApi({ node, applicationKey });

describe("useApi.listLayouts", () => {
  it("should be defined", async () => {
    expect(listLayouts).toBeTruthy();
  });

  it("list all the layouts.", async () => {
    const catchFn = jest.fn((err) => console.trace(err));
    const thenFn = jest.fn();

    // using the component, which should make a server response

    const promise = listLayouts()
      .then(thenFn)
      .catch(catchFn);

    // since `get` method is a spy, we can check if the server request was correct
    // a) the correct method was used (get)
    // b) went to the correct Endpoint URL ('/layouts')
    expect(mockAxios.get).toHaveBeenCalledWith("/layouts");

    // simulating a server response
    mockAxios.mockResponse({ data: listLayoutsResponse });

    await promise;

    // checking the `then` spy has been called and if the
    // response from the server was converted to upper case
    expect(thenFn).toHaveBeenCalledWith(listLayoutsResult);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });
});
