import Home from 'components/Home';
import User from 'components/User';

const TopBar = ({ home, user }) => {
	return (
		<header className="fixed inset-x-0">
			<div className="flex flex-row md:justify-between p-5 bg-green-300 md:items-center justify-center">
				<User user={user} />
				<h1 className="hidden md:inline uppercase font-bold ">Tasklist</h1>
				<Home home={home} />
			</div>
		</header>
	);
};

export default TopBar;
