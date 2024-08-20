import React, { useState } from 'react';
import axios from 'axios';

interface UrlFormProps {
  setUrls: React.Dispatch<React.SetStateAction<{ id: number; description: string; originalUrl: string; shortUrl: string }[]>>;
}

const UrlForm: React.FC<UrlFormProps> = ({ setUrls }) => {

  const formatUrl = (url: string): string => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const [originalUrl, setOriginalUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUrl = formatUrl(originalUrl);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/urls`, {
        originalUrl: formattedUrl,
      });

      setOriginalUrl('');
      setUrls(prevUrls => [...prevUrls, response.data]);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0' }}>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Link Giriniz."
        required
      />
      <button type="submit">Kısalt</button>
    </form>
  );
};

export default UrlForm;
