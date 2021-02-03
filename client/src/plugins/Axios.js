/**
 * Network request configuration
 */
import Config from "../config";
import axios from "axios";
axios.defaults.timeout = 100000;
axios.defaults.baseURL = Config.baseURL;

/**
 * http request Interceptor
 */
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response Interceptor
 */
axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log("Expired");
    }
    return response;
  },
  (error) => {
    console.log("Error request:", error);
  }
);

/**
 * Package get method
 * @param url  Request url
 * @param params  Request parameter
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Package post request
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        // Close the progress bar
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * Encapsulate the patch request
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * Package put request
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

// Unified interface processing, return data
export default function (fecth, url, param) {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

// Failure prompt
function msag(err) {
  let res = "";
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        res = err.response.data.error.details;
        break;
      case 401:
        res = "Unauthorized, please log in";
        break;

      case 403:
        res = "Access denied";
        break;

      case 404:
        res = "Request address error";
        break;

      case 408:
        res = "Request timed out";
        break;

      case 500:
        res = "服务器内部错误";
        break;

      case 501:
        res = "Service not implemented";
        break;

      case 502:
        res = "Gateway error";
        break;

      case 503:
        res = "Service is not available";
        break;

      case 504:
        res = "网关超时";
        break;

      case 505:
        res = "Gateway timeout";
        break;
    }
    return res;
  }
}

/**
 * View the returned data
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data.code === -1) {
  }
}
