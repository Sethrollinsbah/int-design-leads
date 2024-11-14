import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { Resend } from 'resend';

export async function POST({ request }) {
	try {
		const { leadName, data } = await request.json();

		console.log(leadName, data);
		if (!leadName || !data) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		// let email = 'Brianna.healthcareadvising@gmail.com';
		//
		// await resend.emails.send({
		//   from: 'Not Seth <leadmagnet@b-un.com>',
		//   to: [email],
		//   subject: `NEW LEAD: ${leadName}`,
		//   html: `
		//   <p>
		//     <strong>FIRSTNAME:</strong> ${leadName.name}<br>
		//     <strong>LASTNAME:</strong> ${leadName.lastName}<br>
		//     <strong>EMAIL:</strong> ${data.email}
		//     <strong>PHONE TYPE:</strong> ${data.code}<br>
		//     <strong>PHONE:</strong> ${data.phone}<br>
		//     <strong>DOB:</strong> ${data.age.year}-${data.age.month}-${data.age.day}<br>
		//     <strong>CURRENT AGE:</strong> ${currentAge}<br>
		//     <strong>HOUSEHOLD:</strong> ${data.house}<br>
		//     <strong>ZIP:</strong> ${data.zip}<br>
		//   </p>
		// `
		// });

		const leadToInsert = {
			id: crypto.randomUUID(),
			created_at: Math.floor(Date.now() / 1000), // UNIX timestamp in seconds (integer)
			name: data.name ?? 'NA',
			surname: data.lastName ?? 'NA',
			email: data.email ?? 'NA',
			phone_code: parseInt(data.code, 10) || 0, // Convert phone code to integer
			phone: data.phone ?? 'NA',
			dob: new Date(data.age.year, data.age.month - 1, data.age.day).getTime() / 1000 || 0, // Convert DOB to UNIX timestamp
			house: parseInt(data.house, 10) || 0, // Convert house number to integer if applicable
			zip: parseInt(data.zip, 10) || 0 // Convert ZIP code to integer
		};

		// Insert the lead into the database
		await db.insert(schema.lead).values(leadToInsert);

		return new Response(JSON.stringify({ status: 200, message: 'Lead successfully created' }), {
			status: 200
		});
	} catch (error) {
		console.error('Error inserting lead:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500
		});
	}
}
