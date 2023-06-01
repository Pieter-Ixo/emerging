import { toBase64 } from "@cosmjs/encoding";
import { create } from "apisauce";

const api = create({
  baseURL: "http://historical.data.emerging.eco/",
  headers: { Accept: "application/vnd.github.v3+json" },
});

// A mock function to mimic making an async request for data
export async function fetchStoveById(stoveID: any) {
  api.setHeader("Authorization", "Basic aXhvOjFhMDkwY2ExN2UwYjI2YjFhNjhkNA==");
  const resp = await api.get(`v2/stoves/${stoveID}`);
  console.log("RES", resp);
  if (!resp.problem) {
    return resp.data;
  }
}

/*
GET getOne/:table/:id
GET getAll/:table
GET getAll/:table?page=0&size=0*/

// A mock function to mimic making an async request for data
export async function get(table: string, id: string) {
  const resp = await api.get(`getOne/${table}/${id}`);
  console.log("RES", resp);
  if (!resp.problem) {
    return resp.data;
  }
}
