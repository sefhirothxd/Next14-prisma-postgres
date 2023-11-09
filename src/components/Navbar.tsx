import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { signOut } from 'next-auth/react';

const Navbar = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	return (
		<nav className="flex justify-between items-center py-3 bg-gray-950 text-white px-24">
			<h1 className="text-xl font-bold">NextAuth</h1>
			<ul className="flex gap-x-2">
				{session ? (
					<>
						<li>
							<Link href={'/dashboard'}>Dashboard</Link>
						</li>
						<li>
							<Link href={'/api/auth/signout'}>Log out</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link href={'/'}>Home</Link>
						</li>
						<li>
							<Link href={'/auth/login'}>Login</Link>
						</li>
						<li>
							<Link href={'/auth/register'}>Register</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
