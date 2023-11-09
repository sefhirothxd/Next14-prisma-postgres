import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/libs/db';
import bcrypt from 'bcrypt';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'email@email.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '********',
				},
			},
			async authorize(credentials, req) {
				if (!credentials) {
					// Manejar el caso en el que 'credentials' es undefined
					return null;
				}
				const userFound = await db.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!userFound) throw new Error('Usuario o contraseña incorrectos');

				const matchPassword = await bcrypt.compare(
					credentials.password,
					userFound.password
				);

				if (!matchPassword) throw new Error('Usuario o contraseña incorrectos');

				return {
					id: userFound.id.toString(),
					email: userFound.email,
					username: userFound.username,
				};
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
