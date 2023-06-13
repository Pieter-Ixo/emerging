import type { NextApiRequest, NextApiResponse } from 'next';

import { getCookstove } from '@/lib/cookstove';
import { STOVE_DATA } from '@/types/stove';

export type CookstoveByIdResponse = {
	error?: string;
	data?: STOVE_DATA;
};

const cookstoveById = async (req: NextApiRequest, res: NextApiResponse<CookstoveByIdResponse>) => {
	const { deviceId } = req.query;
	const deviceIdNum = Number(deviceId);
	if (isNaN(deviceIdNum)) return res.status(400).json({ error: 'deviceId not a number' });

	const authBasic = process.env.SUPAMOTO_AUTH_HEADER ?? Buffer.from(`${process.env.SUPAMOTO_USER_ID  }:${  process.env.SUPAMOTO_USER_PASSWORD}`).toString();

	try {
		const data = await getCookstove(deviceIdNum, {
			Authorization: `Basic ${authBasic}`,
		});
		if (!data) throw Error();
		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ error: 'Unable to fetch Cookstove' });
	}

	res.end();
};

export default cookstoveById;
