import URLParse from "url-parse";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosAPI {
  url: string = "";

  setHeaders(): this {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Client-Time"] = new Date().toISOString();

    return this;
  }

  setUrl = (url: string, query: { [key: string]: string } = {}): this => {
    this.url = url;

    const queryKeys = Object.keys(query);
    if (queryKeys.length > 0) {
      const queryString = queryKeys
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&");
      this.url = `${url}?${queryString}`;
    }

    return this;
  };

  setPath = (path: string, query = {}): this => {
    const rUrl = path
      .split("/")
      .filter((item) => !!item)
      .join("/");

    // ⛳️ TODO: Replace with environment variable in production
    const url = new URLParse(`https://admin.ashaa.xyz/api/${rUrl}`, true);
    // const url = new URLParse(`https://localhost:5050/api/${rUrl}`, true);

    const newQuery = { ...url.query, ...query };
    url.set("query", newQuery);

    this.url = url.toString();

    return this;
  };

  getUrl = (): string => this.url;

  get(options?: AxiosRequestConfig): Promise<AxiosResponse> {
    this.setHeaders();
    return axios
      .get(this.url, options)
      .then((response: AxiosResponse) => response)
      .catch((err) => {
        console.error("GET error:", err); // 🔍 Debug
        throw err;
      });
  }

  post(
    params: Record<string, unknown>,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    this.setHeaders();
    return axios
      .post(this.url, params, options)
      .then((response: AxiosResponse) => response)
      .catch((err) => {
        console.error("POST error:", err); // 🔍 Debug
        throw err;
      });
  }
}

export const AxiosAuth = new AxiosAPI();
