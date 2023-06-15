function getCurrentRoute(): string[] {
  const route = window.location.pathname.split("/");
  route.shift();
  return route;
}
export default getCurrentRoute;
