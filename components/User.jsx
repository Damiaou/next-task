const User = ({ user }) => {
	return (
		<h5 className="text-sm hidden md:inline">
			Hello <br />
			<span className=" font-semibold">{user ? user.email : 'anonymous'}</span>
		</h5>
	);
};

export default User;
