import GlobalIconLink from "../GlobalIconLink";

function GlobalLink({ isGlobalSelected }: { isGlobalSelected: boolean }) {
  const isSelected = isGlobalSelected ? "selected" : "notSelected";
  return <GlobalIconLink status={isSelected} />;
}

export default GlobalLink;
