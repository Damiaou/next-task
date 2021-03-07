import React, { useState, useEffect, useReducer } from 'react';
import TopBar from 'components/TopBar';
import Layout from 'components/Layout';
import Card from 'components/Card';
import Task from 'components/Task';
import { format } from 'date-fns';
import Button from 'components/Button';
import axios from 'axios';

const taskReducer = (tasks, { type, payload }) => {
	switch (type) {
		case 'ADD': {
			return [...tasks, payload];
		}
		case 'SET': {
			return payload;
		}
		default: {
			console.info(`Action not handled : ${type}`);
		}
	}
};

const TaskList = () => {
	const [user, setUser] = useState(null);
	const [home, setHome] = useState(null);
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user')));
		setHome(JSON.parse(localStorage.getItem('home')));
	}, []);

	const [tasks, dispatch] = useReducer(taskReducer, []);
	const addTask = (payload) => dispatch({ type: 'ADD', payload });
	const setTask = (payload) => dispatch({ type: 'SET', payload });

	useEffect(() => {
		axios.get(home ? `https://young-ravine-65632.herokuapp.com/taskForHome/${home.hash}` : '').then((response) => {
			setTask(response.data);
		});
	}, [home]);

	const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

	const [newTask, setNewTask] = useState({ label: '', repeat: 1 });
	const [taskToAdd, setTaskToAdd] = useState(false);

	useEffect(() => {
		if (newTask.label && newTask.repeat) {
			setTaskToAdd(true);
		} else {
			setTaskToAdd(false);
		}
	}, [newTask]);

	const changeTaskLabel = (e) => {
		setNewTask({ repeat: newTask.repeat, label: e.target.value });
	};

	const changeTaskRepeat = (e) => {
		setNewTask({ label: newTask.label, repeat: e.target.value });
	};

	const saveTask = (e) => {
		e.preventDefault();
		axios
			.post(`https://young-ravine-65632.herokuapp.com/task/`, {
				label: newTask.label,
				repeat: newTask.repeat,
				home_hash: home.hash,
			})
			.then((response) => {
				setNewTask(response.data);
				addTask(newTask);
				setNewTask({ label: '', repeat: 1 });
			});
		console.log('Saving !');
	};

	const displayAdd = !taskToAdd ? 'invisible' : undefined;

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
							{tasks && tasks.length > 0 && Array.isArray(tasks)
								? tasks.map((t) => <Task key={t.id} task={t} />)
								: 'No task for this house.'}
							<form onSubmit={(e) => saveTask(e)}>
								<div className="space-x-3">
									<input
										minLength="4"
										onChange={(e) => changeTaskLabel(e)}
										value={newTask.label}
										placeholder="Add task"
										type="text"
										className="w-48 bg-transparent focus:border-pink-200 outline-none text-center border-b-2 border-green-200  placeholder-green-200"
									/>
									<input
										onChange={(e) => changeTaskRepeat(e)}
										placeholder="Repetition"
										value={newTask.repeat}
										type="number"
										name="repeat"
										id="repeat"
										className="w-8 bg-transparent focus:border-pink-200 outline-none text-center border-b-2 border-green-200  placeholder-green-200"
									/>
								</div>
								<div className={`transition duration-500 ease-in-out ${displayAdd}`}>
									<Button className="w-full mt-4">Save</Button>
								</div>
							</form>
						</div>
					</div>
				</Card>
			</Layout>
		</>
	);
};

export default TaskList;
