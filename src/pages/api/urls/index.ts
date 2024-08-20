import type { NextApiRequest, NextApiResponse } from 'next';
import * as urlService from '../../../app/services/urlService';
import db from '../../../app/models';

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error: Error) => {
    console.error('Error synchronizing models:', error);
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const urls = await urlService.getAllUrls();
      res.status(200).json(urls);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching URLs' });
    }
  } else if (req.method === 'POST') {
    try {
      const newUrl = await urlService.createUrl(req.body.originalUrl);
      res.status(201).json(newUrl);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the URL' });
    }
  } else {
    res.status(405).end();
  }
}
