'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const onSubmit = async (data: any) => {
		if (data.password !== data.confirmPassword) {
			return alert('Las contraseñas no coinciden');
		}

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: data.username,
				email: data.email,
				password: data.password,
			}),
		});

		if (res.ok) {
			router.push('/auth/login');
		}
		console.log(res);
	};

	return (
		<div className="h-[calc(100vh-7rem)] flex justify-center items-center">
			<form className="w-1/4" action="" onSubmit={handleSubmit(onSubmit)}>
				<h1 className=" text-slate-200 text-4xl mb-4 font-bold">Register</h1>
				<label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
					UserName:
				</label>
				<input
					className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
					type="text"
					{...register('username', {
						required: true,
						minLength: 5,
						maxLength: 20,
					})}
					placeholder="Enter your username"
				/>
				{errors.username && errors.username.type === 'required' && (
					<span className="text-red-500">Este campo es requerido</span>
				)}
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
					placeholder="Enter your email"
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
				<label
					htmlFor="confirmpassword"
					className="text-slate-500 mb-2 block text-sm"
				>
					Confirm password:
				</label>
				<input
					className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
					type="password"
					{...register('confirmPassword', {
						required: true,
					})}
					placeholder="******"
				/>
				{errors.confirmPassword &&
					errors.confirmPassword.type === 'required' && (
						<span className="text-red-500">
							Se requiere confirmar contraseña
						</span>
					)}
				<button className="w-full bg-blue-500 rounded-lg text-white p-3 mt-2">
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
