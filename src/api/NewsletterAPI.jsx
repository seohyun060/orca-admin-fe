import { getCookie } from 'src/cookies/cookie';

export async function getNewsletters() {
	return fetch('https://api-orca.beamworks.co.kr/api/newsletters', {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}

export async function deleteNewsletter(id) {
	return fetch(`https://api-orca.beamworks.co.kr/api/newsletters/${id}`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'DELETE',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
