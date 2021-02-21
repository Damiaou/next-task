import React, { useState, useEffect } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import TopBar from 'components/TopBar';
import Layout from 'components/Layout';
import Card from 'components/Card';
import Task from 'components/Task';
import useSWR from 'swr';
import { format } from 'date-fns';

const TaskList = () => {
	const [user, setUser] = useLocalStorage('user');
	const [home, setHome] = useLocalStorage('home');
	const [tasks, setTasks] = useState([]);
	const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

	const fetcher = (url) => fetch(url).then((r) => r.json());

	const { data, error } = useSWR(
		home && !data ? `https://young-ravine-65632.herokuapp.com/taskForHome/${home.hash}` : '',
		fetcher
	);
	if (tasks !== data) {
		setTasks(data);
	}

	return (
		<>
			<TopBar user={user} home={home} />
			<Layout>
				<Card className="flex flex-col">
					<h1 className="p-2 mb-4 text-center font-semibold text-xl text-white">Task for the week</h1>
					<div className="font-bold text-center mb-4">
						<input
							type="date"
							name="date"
							id="date"
							value={date}
							onChange={(e) => {
								setDate(e.target.value);
							}}
							className="rounded p-2 ring-2 ring-green-500 text-green-400"
						/>
						{/* Soon the prev, next and open datepicker button */}
					</div>
					<div>
						<div className="divide-green-300 rounded space-y-3">
							{tasks ? tasks.map((t) => <Task key={t.id} task={t} />) : 'No task for this house.'}
						</div>
					</div>
				</Card>
			</Layout>
		</>
	);
};

export default TaskList;
