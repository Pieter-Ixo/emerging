import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get('https://ixo-airtable-tc-daemon.ixo-dev.workers.dev/getTC');

      if (!response?.data) throw new Error('No data found');

      res.status(200).json(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : err || 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
