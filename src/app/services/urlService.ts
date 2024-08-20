import db from "../models";
import { fetchTitleFromUrl } from "../utils/fetchTitleFromUrl";
import { generateShortUrl } from "../utils/shortUrlGenerator";

const Url = db.Url;

export const createUrl = async (originalUrl: string) => {
  try {
    const shortUrl = generateShortUrl();
    const description = await fetchTitleFromUrl(originalUrl);

    const newUrl = await Url.create({ originalUrl, shortUrl, description });
    return newUrl;
  } catch (error) {
    console.error('Error creating URL in database: ', error);
    throw error;
  }
};

export const getAllUrls = async () => {
  try {
    const urls = await Url.findAll();
    return urls;
  } catch (error) {
    console.error('Error fetching URLs from database: ', error);
    throw error;
  }
};

export const updateUrl = async (id: string, originalUrl: string) => {
  const url = await Url.findByPk(id);

  if (!url) {
    throw new Error('URL not found!');
  }

  const shortUrl = generateShortUrl();
  const description = await fetchTitleFromUrl(originalUrl);

  url.originalUrl = originalUrl;
  url.shortUrl = shortUrl;
  url.description = description;

  await url.save();
  return url;
};

export const deleteUrl = async (id: string) => {
  const url = await Url.findByPk(id);

  if (!url) {
    throw new Error('URL not found!');
  }

  await url.destroy();
};
