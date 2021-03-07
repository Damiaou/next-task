import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import * as Icons from 'components/Icons';
import { Fire } from './Icons';

const historyReducer = (histories, { type, payload }) => {
	switch (type) {
		case 'SET': {
			return payload;
		}
		case 'ADD': {
			return [...histories, payload];
		}
		default: {
			console.info(`Type not handled : ${type}`);
		}
	}
};

const Task = ({ task }) => {
	// I need the history for a task, we display it
	const [histories, dispatch] = useReducer(historyReducer, []);
	const add = (payload) => dispatch({ type: 'ADD', payload });
	const set = (payload) => dispatch({ type: 'SET', payload });
	const [clicked, setClicked] = useState(false);
	useEffect(() => {
		if (task) {
			axios
				.post(`https://young-ravine-65632.herokuapp.com/historyForTask`, {
					task: task.id,
				})
				.then((response) => {
					set(response.data);
				});
		}
	}, [task]);

	const clickHandler = () => {
		setClicked(!clicked);
	};

	/**
	 * Create a new history for this task
	 * @param {object} task Task object
	 */
	const addHistory = async (task) => {
		if (histories.length < task.repeat) {
			axios
				.post(`https://young-ravine-65632.herokuapp.com/history`, {
					id_user: JSON.parse(localStorage.getItem('user')).id,
					id_task: task.id,
					when: Date.now(),
				})
				.then((response) => {
					console.log('Create history response', response.data);
					add(response.data);
				});
		} else {
			alert(`Update the task if you need to make it more than ${task.repeat} times`);
		}
	};

	const historyhandler = (e) => {
		e.stopPropagation();
		addHistory(task);
		setClicked(false);
	};

	return (
		<>
			<div
				onClick={clickHandler}
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
						<span key={task.id} className="font-semibold">
							{task.label}
						</span>

						<span className="ml-2">
							&nbsp;
							{histories.length / task.repeat === 1 ? (
								<span>
									<Fire className="inline" />
								</span>
							) : (
								`${histories.length}/${task.repeat}`
							)}
						</span>
					</div>
				)}
			</div>
		</>
	);
};

export default Task;
