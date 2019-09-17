

/**
 * Método centralizador de requisições para API
 */
export default async ({ url, ...options }) => {
	try {
		let apiUrl = `http://localhost:3001/movies`;

		const response = await fetch(`${apiUrl}${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			...options
		});

		return await response.json();
	} catch (error) {
		window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
	}
};


