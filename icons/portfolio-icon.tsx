import { SVGProps } from "react";

type Status = "active" | "inactive" | "disabled";

function getColor(status: Status): string {
  switch (status) {
    case "disabled":
      return "#888";
    case "active":
      return "#fff";
    case "inactive":
      return "#000";
    default:
      return "#000";
  }
}

type Props = SVGProps<SVGSVGElement> & {
  selected?: boolean;
  status: Status;
};

function PortfolioIcon(props: Props) {
  const { status, ...svgProps } = props;
  const color = getColor(status);

  return (
    <svg
      width={46}
      height={47}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
      {...svgProps}
    >
      <rect
        y="0.5"
        width="46"
        height="46"
        rx="23"
        fill={status === "active" ? "#2B94F5" : "#F1F1F1"}
      />
      <path
        d="M28.2266 14.5002C28.1123 14.5031 27.9922 14.5177 27.875 14.547L15.6875 17.758C14.7031 18.0158 14 18.9181 14 19.9377V30.2502C14 31.4836 15.0166 32.5002 16.25 32.5002H29.75C30.9834 32.5002 32 31.4836 32 30.2502V20.5002C32 19.2668 30.9834 18.2502 29.75 18.2502H19.7188L28.25 16.0002V17.5002H29.75V16.0002C29.75 15.1564 29.0322 14.4884 28.2266 14.5002ZM16.25 19.7502H29.75C30.1748 19.7502 30.5 20.0753 30.5 20.5002V30.2502C30.5 30.675 30.1748 31.0002 29.75 31.0002H16.25C15.8252 31.0002 15.5 30.675 15.5 30.2502V20.5002C15.5 20.0753 15.8252 19.7502 16.25 19.7502ZM27.875 24.2502C27.2539 24.2502 26.75 24.7541 26.75 25.3752C26.75 25.9962 27.2539 26.5002 27.875 26.5002C28.4961 26.5002 29 25.9962 29 25.3752C29 24.7541 28.4961 24.2502 27.875 24.2502Z"
        fill={color}
      />
    </svg>
  );
}

export default PortfolioIcon;
