'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const [error, setError] = useState('');
	const onSubmit = async (data: any) => {
		const res = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
		});

		if (res?.ok === false) {
			setError(res.error as string);
			setTimeout(() => {
				setError('');
			}, 3000);
		} else {
			router.push('/dashboard');
			router.refresh();
		}
	};
	return (
		<div className="h-[calc(100vh-7rem)] flex justify-center items-center">
			<form className="w-1/4" action="" onSubmit={handleSubmit(onSubmit)}>
				{error && (
					<p className="bg-red-500 text-base p-3 text-white font-bold">
						{error}
					</p>
				)}
				<h1 className=" text-slate-200 text-4xl mb-4 font-bold">Login</h1>

				<label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
					Email:
				</label>
				<input
					className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
					type="email"
					{...register('email', {
						required: true,
						pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
					})}
					placeholder="user@email.com"
				/>
				{errors.email && errors.email.type === 'required' && (
					<span className="text-red-500">Este campo es requerido</span>
				)}
				<label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
					Password:
				</label>
				<input
					className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
					type="password"
					{...register('password', {
						required: true,
					})}
					placeholder="******"
				/>
				{errors.password && errors.password.type === 'required' && (
					<span className="text-red-500">Este campo es requerido</span>
				)}
				<button className="w-full bg-blue-500 rounded-lg text-white p-3 mt-2">
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
