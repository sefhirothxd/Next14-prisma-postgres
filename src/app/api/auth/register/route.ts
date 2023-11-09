import { NextResponse } from 'next/server';
import db from '@/libs/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
	try {
		const data = await request.json();
		console.log(data);
		const emailFound = await db.user.findUnique({
			where: {
				email: data.email,
			},
		});
		const userFound = await db.user.findUnique({
			where: {
				email: data.username,
			},
		});

		if (userFound || emailFound) {
			return NextResponse.json(
				{
					error: 'User o email already exists',
				},
				{
					status: 400,
				}
			);
		}
		const hashedPassword = await bcrypt.hash(data.password, 10);
		const newUser = await db.user.create({
			data: {
				email: data.email,
				username: data.username,
				password: hashedPassword,
			},
		});

		const { password: _, ...user } = newUser;

		return NextResponse.json(user, {
			status: 201,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				error: (error as Error).message || 'Something went wrong',
			},
			{
				status: 500,
			}
		);
	}
}
