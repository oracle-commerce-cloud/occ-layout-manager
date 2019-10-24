import qs from "qs";

export const loginFactory = (axiosInstance: any, key: string) => async () => {
  const form = qs.stringify({ grant_type: "client_credentials" });
  const config = {
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const { access_token } = await axiosInstance.post("/login", form, config).then((response: any) => response.data);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  axiosInstance.defaults.headers.common["x-ccasset-language"] = "en";
  // setInterval(login, expires_in * 99);
  return access_token;
};
