let protocol = window.location.protocol
let url = window.location.hostname
let port = window.location.port

export const API_URL = "http://" + url + ":" + port
/*
export const API_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8080"
    : "http://localhost:9200";
*/
