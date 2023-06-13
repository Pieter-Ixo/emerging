import type { NextApiRequest, NextApiResponse } from 'next';

import { getCookstoveSessions } from '@/lib/cookstove';
import { STOVE_SESSIONS } from 'types/stove';

export type CookstoveSessionsResponse = {
	error?: string;
	data?: STOVE_SESSIONS;
};

const cookstoveSessions = async (req: NextApiRequest, res: NextApiResponse<CookstoveSessionsResponse>) => {
	const { deviceId, page, startDate, endDate, getAllForPeriod } = req.query;
	const deviceIdNum = Number(deviceId);
	const pageNum = Number(page) || 0;
	if (isNaN(deviceIdNum)) return res.status(400).json({ error: 'deviceId not a number' });
	if (!startDate || !endDate) return res.status(400).json({ error: 'startDate and endDate is required' });

	const authBasic = process.env.SUPAMOTO_AUTH_HEADER ?? Buffer.from(`${process.env.SUPAMOTO_USER_ID  }:${  process.env.SUPAMOTO_USER_PASSWORD}`).toString();

	let allData: STOVE_SESSIONS;
	const getData = async (pageNumber?: number) => {
		const data = await getCookstoveSessions(deviceIdNum, pageNumber ?? pageNum, 500, startDate as string, endDate as string, {
			Authorization: `Basic ${authBasic}`,
		});
		if (!data) throw Error();
		return data;
	};

	try {
		allData = await getData();
		if (getAllForPeriod && allData.totalPages! > 1) {
			const listData = await Promise.all(
				Array(allData.totalPages! - 1)
					.fill(0)
					.map((_, i) => getData(i + 1)),
			);
			listData.forEach(d => (allData = { ...d, content: [...(allData.content ?? []), ...(d.content ?? [])] }));
		}
		res.status(200).json({ data: allData });
	} catch (error) {
		res.status(400).json({ error: 'Unable to fetch Cookstove Sessions' });
	}

	res.end();
};

export default cookstoveSessions;
