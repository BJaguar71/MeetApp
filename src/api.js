/**
 *
 * @param {*} events:
 * the following function should be in the "api.js" file.
 * this function takes an events array, then uses map to create a new array with only locations.
 * it will also remove all duplicates by createing another new arry using the spread operator and spreading a set.
 * the set will remove all duplicates from the array.
 */
import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";

export const extractLocations = (event) => {
  console.log(event, "event in api");
  let extractLocations = event.map((event) => event.location);
  let locations = [...new Set(extractLocations)];
  return locations;
};

// define a function to check the validity of the access token
// export it to could use it outside this file
export const checkToken = async (accessToken) => {
  // if it was unvalid then redirect the user to the google authorization screen via an ajax request
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

// define a function to remove the code from the url once we are finish with it
const removeQuery = () => {
  // check whether there’s a path, then build the URL with the current path
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// define a function to get the token by redirecting user to the google to logn with and redirect back to the Meet App
// the function should take the code and encodes it then uses the encoded code to get the token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    "https://5bsexv41pb.execute-api.eu-central-1.amazonaws.com/dev/api/token/" +
      encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

//  define a function to get events asynchronously from the api
export const getEvents = async (events) => {
  //
  // NProgress.start();

  //define a condition to check if the request is made through localhost (fetch data from mockdata file) or through the app url (fetch data from GGL api)
  // if (window.location.href.startsWith("http://localhost")) {
  //   NProgress.done();
  //   return mockData;
  // }

  if (token) {
    // remove the code from url once the request is done
    removeQuery();
    //
    const url =
      "https://5bsexv41pb.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/" +
      token;

    const result = await axios.get(url);

    if (result.data) {
      let locations = extractLocations(result.data.events);

      localStorage.setItem("lastEvents", JSON.stringify(result.data));

      localStorage.setItem("locations", JSON.stringify(locations));
    }

    //NProgress.done();
    return result.data.events;
  }

  // if user is offline, load the events from localstorage
  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    //NProgress.done();
    return data ? JSON.parse(events).events : [];
  }
  //
  const token = await getAccessToken();
};

// define an async function to get the access token
export const getAccessToken = async () => {
  // check the localStorage and retrive the data from it to see if there is already an access token
  const accessToken = localStorage.getItem("access_token");

  const tokenCheck = accessToken && (await checkToken(accessToken));

  // check if there is an access token and also if it is valid one
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);

    // then checks for an authorization code
    const code = await searchParams.get("code");

    //  if the no auth code was found it will redirect to the google auth screen
    if (!code) {
      const results = await axios.get(
        "https://5bsexv41pb.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
