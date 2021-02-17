import Home from "components/Home";
import User from "components/User";

const TopBar = ({ home, user }) => {
  return (
    <header className="fixed inset-x-0 text-size-">
      <div className="flex flex-row justify-between p-5 bg-green-300 items-center">
        <User user={user} />
        <h1 className="uppercase font-bold">Tasklist</h1>
        <Home home={home} />
      </div>
    </header>
  );
};

export default TopBar;
