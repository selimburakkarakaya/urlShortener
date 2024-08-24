import axios from "axios";

export const parseTitleFromHtml = (html: string): string => {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch && titleMatch[1].trim()) {
    return titleMatch[1].trim();
  } else {
    throw new Error("Title not found in the page.");
  }
};

export const fetchTitleFromUrl = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
      timeout: 25000,
    });
    const title = parseTitleFromHtml(data);
    return title;
  } catch (error) {
    console.error('Error fetching title: ', error);
    throw new Error('Title not available');
  }
};