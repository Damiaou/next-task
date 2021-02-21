import { useRouter } from 'next/router';
import useLocalStorage from 'hooks/useLocalStorage';
import { useEffect } from 'react';
import TaskList from './TaskList/TaskList';

export default function Home() {
	const router = useRouter();

	const [user, setUser] = useLocalStorage('user');
	const [home, setHome] = useLocalStorage('home');

	useEffect(() => {
		console.log('user in index', user);
		console.log('home in index', home);

		if (!home) {
			router.push('home/login');
		}
		if (!user) {
			router.push('/user/login');
		}
	}, [user, home]);

	return <TaskList />;
}
