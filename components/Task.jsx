import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Icons from 'components/Icons';
import { useRouter } from 'next/router';

const Task = ({ task }) => {
	const router = useRouter();
	console.log('Task component render');
	// I need the history for a task, we display it
	const [history, setHistory] = useState([]);
	const [clicked, setClicked] = useState(false);
	useEffect(() => {
		axios
			.post(`https://young-ravine-65632.herokuapp.com/historyForTask`, {
				task: task.id,
			})
			.then((response) => {
				setHistory(response.data);
				if (!response.data.length) {
					setHistory(['No history for the week']);
				}
			});
	}, []);

	const clickHandler = (e) => {
		setClicked(true);
	};

	/**
	 * Create a new history for this task
	 * @param {object} task Task object
	 */
	const addHistory = async (task) => {
		axios
			.post(`https://young-ravine-65632.herokuapp.com/history`, {
				id_user: JSON.parse(localStorage.getItem('user')).id,
				id_task: task.id,
				when: new Date(),
			})
			.then((response) => {
				console.log('Create history response', response.data);
			});
	};

	const historyhandler = (e) => {
		e.stopPropagation();
		addHistory(task);
		setClicked(false);
	};

	return (
		<>
			<div
				onClick={!clicked ? clickHandler : undefined}
				className="border-t-2 border-green-200 transition duration-500 ease-in-out bg-green-100 text-green-700 p-2  shadow hover:shadow-lg hover:bg-green-200"
			>
				{clicked ? (
					// Add one to history
					// If history.length === task.repeat -> task is done !
					<div className="flex justify-between">
						<span>
							<Icons.Setting className="cursor-pointer" />
						</span>
						<span onClick={historyhandler}>
							<Icons.Plus className="cursor-pointer" />
						</span>
					</div>
				) : (
					<div className="flex flex-row justify-between divide-x-2 divide-green-200  cursor-pointer">
						<span key={task.id}>&#9679; {task.label}</span>

						<span className="ml-2">
							&nbsp;{history.length}/{task.repeat}
						</span>
					</div>
				)}
			</div>
		</>
	);
};

export default Task;
