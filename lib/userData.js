import { getToken } from './authenticate.js';

async function fetchWithAuth(url, method, body) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
    };

    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return await response.json();
}

export async function addToFavourites(id) {
    try {
        const result = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, 'PUT');
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function removeFromFavourites(id) {
    try {
        const result = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, 'DELETE');
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getFavourites() {
    try {
        const result = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, 'GET');
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addToHistory(id) {
    try {
        const result = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, 'PUT');
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function removeFromHistory(id) {
    try {
        const result = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, 'DELETE');
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getHistory() {
    try {
        const result = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history`, 'GET');
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}
