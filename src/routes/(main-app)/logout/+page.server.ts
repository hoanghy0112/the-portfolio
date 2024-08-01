
export async function load({ cookies }) {
	cookies.delete('session', { path: '/' });
}
