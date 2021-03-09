import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import TaskList from './TaskList/TaskList';

export default function Home() {
	if (typeof window === undefined) {
		return <div>Loading..</div>;
	}

	const router = useRouter();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		const home = JSON.parse(localStorage.getItem('home'));
		if (!user) {
			console.log('user in index', user);
			router.push('/user/login');
		}
		if (!home) {
			console.log('home in index', home);
			router.push('home/login');
		}
	}, []);

	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<title>TaksList</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<TaskList />
		</>
	);
}
