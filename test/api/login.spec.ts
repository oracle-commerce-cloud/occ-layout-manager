import { useApi } from "@api";
import mockAxios from "jest-mock-axios";

import loginResponse from "../mock/loginResponse.json";
import qs from "qs";

const { node, applicationKey } = process.env || { node: "https://test.com", applicationKey: "hhhhh" };
const { login } = useApi({ node, applicationKey });

describe("useApi.login", () => {
  it("should be defined", async () => {
    expect(login).toBeTruthy();
  });

  it("get a new access token", async () => {
    const catchFn = jest.fn();
    const thenFn = jest.fn();

    // using the component, which should make a server response

    const promise = login()
      .then(thenFn)
      .catch(catchFn);

    // since `post` method is a spy, we can check if the server request was correct
    // a) the correct method was used (post)
    // b) went to the correct Endpoint URL ('/login')
    // c) if the payload was correct (grant_type, Authorization, Content-Type)
    expect(mockAxios.post).toHaveBeenCalledWith("/login", qs.stringify({ grant_type: "client_credentials" }), {
      headers: {
        "Authorization": `Bearer ${applicationKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // simulating a server response
    mockAxios.mockResponse({ data: loginResponse });

    await promise;

    // checking the `then` spy has been called and if the
    // response from the server was converted to upper case
    expect(thenFn).toHaveBeenCalledWith(loginResponse.access_token);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });
});
