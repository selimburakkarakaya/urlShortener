import type { NextApiRequest, NextApiResponse } from 'next';
import * as urlService from '../../../app/services/urlService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid URL ID' });
  }

  try {
    if (req.method === 'PUT') {
      const updatedUrl = await urlService.updateUrl(id, req.body.originalUrl);
      return res.status(200).json(updatedUrl);
    } else if (req.method === 'DELETE') {
      await urlService.deleteUrl(id);
      return res.status(200).json({ message: 'URL deleted successfully!' });
    } else {
      return res.status(405).end();
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'URL not found!') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'An unknown error occurred' });
  }
}
