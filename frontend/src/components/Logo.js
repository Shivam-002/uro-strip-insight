import { ReactTyped } from "react-typed";
import "./../css/Logo.css";
function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "5px",
      }}
    >
      <ReactTyped
        strings={["Welcome to Uro Strip Insight!"]}
        typeSpeed={50}
        showCursor={false}
        className="logo"
        style={{
          fontFamily: "Rubik",
          color: "#000",
          fontWeight: "bold",
        }}
      />
    </div>
  );
}

export default Logo;
