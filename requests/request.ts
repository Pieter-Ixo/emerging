export default async function request<ReturnType>(
  url: string
): Promise<ReturnType | undefined> {
  const response = await fetch(url, { method: "GET" });
  const data = (await response.json()) as ReturnType;

  return data;
}
