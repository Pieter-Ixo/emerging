export async function getStovesPage() {
  const response = await fetch("/api/stoves", {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });
  return await response.json();
}

export async function getStovebyId(Id: string) {
  const response = await fetch("/api/stoveById/" + Id, {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });
  return await response.json();
}

export async function getCookingSessions(Id: String) {
  const response = await fetch("/api/cookingSessions/" + Id, {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });
  return await response.json();
}

export async function getCookingSessionsSummary(Id: String) {
  const response = await fetch("/api/cookingSessionSummary/" + Id, {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });
  return await response.json();
}

export async function getPellets(Id: String) {
  const response = await fetch("/api/pellets/" + Id, {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });

  return await response.json();
}

export async function getCarbonClaimable(Id: String | undefined) {
  const response = await fetch("/api/claimable/" + Id, {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });

  return await response.json();
}

export async function getTokenTransactions(Id: String | undefined) {
  const response = await fetch("/api/tokenTransactions/" + Id, {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });

  return await response.json();
}
