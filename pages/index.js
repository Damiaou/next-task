import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TaskList from './TaskList/TaskList';

export default function Home() {
	if (typeof window === undefined) {
		return <div>Loading..</div>;
	}

	const router = useRouter();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		const home = JSON.parse(localStorage.getItem('home'));
		if (!home) {
			console.log('home in index', home);
			router.push('home/login');
		}
		if (!user) {
			console.log('user in index', user);
			router.push('/user/login');
		}
	}, []);

	return <TaskList />;
}
