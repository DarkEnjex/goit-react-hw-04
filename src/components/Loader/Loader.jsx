import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <BeatLoader
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
        color="#1585a7"
        size={25}
      />
    </div>
  );
};

export default Loader;
