'use client';
import { signOut } from 'next-auth/react';

const Dashboard = () => {
	return (
		<section className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
			<h1 className="text-white text-5xl">Dashboard</h1>
			<div>
				<button
					className="bg-white text-black px-4 py-2 rounded-md mt-4"
					onClick={() => signOut()}
				>
					Log out
				</button>
			</div>
		</section>
	);
};

export default Dashboard;
