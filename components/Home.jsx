const Home = ({ home }) => {
	return (
		<h5 className="text-lg font-semibold md:text-sm space-y-1">
			{home ? home.label : 'Unknown'} <br />
			<span className="font-semibold">{'#'}</span>
			<span title="Copy me!" className="px-2 select-all cursor-pointer bg-green-200 rounded">
				{home ? `${home.hash}` : ''}
			</span>
		</h5>
	);
};

export default Home;
