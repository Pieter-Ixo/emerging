/* eslint-disable no-console */
import { create } from "apisauce";

const historicalDataEmergingEcoAPI = create({
  baseURL: "http://historical.data.emerging.eco/",
  headers: { Accept: "application/vnd.github.v3+json" },
});
historicalDataEmergingEcoAPI.addMonitor((response) =>
  console.log("apisause!", response)
);

export async function fetchStoveById(stoveID: string) {
  historicalDataEmergingEcoAPI.setHeader(
    "Authorization",
    "Basic aXhvOjFhMDkwY2ExN2UwYjI2YjFhNjhkNA=="
  );
  const resp = await historicalDataEmergingEcoAPI.get(`v2/stoves/${stoveID}`);
  if (resp.problem) {
    console.error(resp.problem);
  }
  return resp?.data;
}

/*
GET getOne/:table/:id
GET getAll/:table
GET getAll/:table?page=0&size=0
*/

export async function getOne(table: string, id: string) {
  const resp = await historicalDataEmergingEcoAPI.get(`getOne/${table}/${id}`);
  if (resp.problem) {
    console.error(resp.problem);
  }
  return resp?.data;
}
