const Home = ({ home }) => {
  return (
    <h5 className="text-sm space-y-1">
      {home ? home.label : "Unknown"} <br />
      <span className="font-semibold">{"# "}</span>
      <span
        title="Copy me!"
        className="select-all cursor-pointer bg-green-200 rounded"
      >
        {home ? `${home.hash}` : ""}
      </span>
    </h5>
  );
};

export default Home;
