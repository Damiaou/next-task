import React, { useState, useEffect } from 'react';
import Button from 'components/Button';
import Card from 'components/Card';
import Layout from 'components/Layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
	const router = useRouter();

	let [userEmail, setUserEmail] = useState('');
	let [isSubmit, setIsSubmit] = useState(false);
	let [loading, setLoading] = useState(false);
	const [home, setHome] = useState(null);

	useEffect(() => {
		setHome(JSON.parse(localStorage.getItem('home')));
	}, []);

	const handleSubmit = (e) => {
		setLoading(true);
		e.preventDefault();
		axios
			.post('https://young-ravine-65632.herokuapp.com/login', {
				email: userEmail,
				home_hash: home.hash,
			})
			.then((response) => {
				console.log('saving and redirecting');
				localStorage.setItem('user', JSON.stringify(response.data));
				router.push('/');
			});
	};

	return (
		<Layout>
			<Card>
				<form onSubmit={(e) => handleSubmit(e)}>
					<fieldset className="p-4">
						<div className="flex flex-col w-48 h-96 space-y-8">
							<legend className="text-lg font-semibold text-center mb-4">
								Please, enter your informations below
							</legend>
							<label htmlFor="email" className="text-center mr-2">
								Email
							</label>
							<input
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
								type="email"
								name="email"
								id="email"
								placeholder="contact@task.com"
								className="bg-transparent focus:border-pink-200 outline-none text-center border-b-2 border-green-200  placeholder-green-300"
							/>
							<Button submit={true} disabled={loading} loading={loading}>
								Save
							</Button>
						</div>
					</fieldset>
				</form>
			</Card>
		</Layout>
	);
};

export default Login;
