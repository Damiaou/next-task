import React, { useState } from 'react';
import Button from 'components/Button';
import Card from 'components/Card';
import Layout from 'components/Layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const Login = () => {
	const router = useRouter();

	let [userEmail, setUserEmail] = useState('');
	let [isSubmit, setIsSubmit] = useState(false);
	let [loading, setLoading] = useState(false);

	const fetcher = (url) => fetch(url).then((r) => r.json());

	const { data, error } = useSWR(
		isSubmit && userEmail ? `https://young-ravine-65632.herokuapp.com/user/${userEmail}` : '',
		fetcher
	);

	const user = data ? data : null;

	if (error) {
		setLoading(false);
		setIsSubmit(false);
	}

	if (user && loading) {
		setLoading(false);
		// redirect sur la home && localStorage

		setUserEmail('user', user);
		if (typeof window !== undefined) {
			localStorage.setItem('user', JSON.stringify(user));
		}

		router.push('/');
	}

	const handleSubmit = (e) => {
		setLoading(true);
		e.preventDefault();
		setIsSubmit(true);
	};

	return (
		<Layout>
			<Card>
				<form onSubmit={(e) => handleSubmit(e)}>
					<fieldset className="p-4">
						<legend className="text-lg">Please, enter your informations below</legend>
						<div className="form-group">
							<label htmlFor="email" className="mr-2">
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
							<Button className="ml-2" submit={true} disabled={loading} loading={loading}>
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
