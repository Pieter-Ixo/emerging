import axios from 'axios';
import { STOVE_DATA, STOVE_PELLETS, STOVE_SESSIONS } from 'types/stove';

export const getCookstove = async (deviceId: number, headers: {}): Promise<STOVE_DATA | undefined> => {
	try {
		const res = await axios.get(`https://api.supamoto.app/api/v2/stoves/${deviceId}`, { headers });
		return res.data;
	} catch (error) {
		console.error('Error fetching Cookstove: ', error);
		throw error;
	}
};

export const getCookstoveSessions = async (deviceId: number, page: number, pageSize: number = 500, startDate: string, endDate: string, headers: {}): Promise<STOVE_SESSIONS | undefined> => {
	try {
		const res = await axios.get(`https://api.supamoto.app/api/v2/stoves/${deviceId}/sessions/cooking?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`, { headers });
		return res.data;
	} catch (error) {
		console.error('Error fetching Cookstove Sessions: ', error);
		throw error;
	}
};

export const getCookstovePellets = async (deviceId: number, page: number, pageSize: number = 500, startDate: string, endDate: string, headers: {}): Promise<STOVE_PELLETS | undefined> => {
	try {
		const res = await axios.get(`https://api.supamoto.app/api/v2/stoves/${deviceId}/pellets/purchases?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`, { headers });
		return res.data;
	} catch (error) {
		console.error('Error fetching Cookstove Pellets: ', error);
		throw error;
	}
};
