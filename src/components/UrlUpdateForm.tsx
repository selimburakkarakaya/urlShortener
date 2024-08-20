import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UrlUpdateFormProps {
  url: { id: number; description: string; originalUrl: string; shortUrl: string } | undefined;
  onUpdate: () => void;
  setUrls: React.Dispatch<React.SetStateAction<{ id: number; description: string; originalUrl: string; shortUrl: string }[]>>;
}

const UrlUpdateForm: React.FC<UrlUpdateFormProps> = ({ url, onUpdate, setUrls }) => {
  const [originalUrl, setOriginalUrl] = useState(url?.originalUrl || '');

  useEffect(() => {
    if (url) {
      setOriginalUrl(url.originalUrl);
    }
  }, [url]);

  if (!url) {
    return <div>URL not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/urls/${url.id}`, {
        originalUrl,
      });

      setUrls(prevUrls =>
        prevUrls.map(u => (u.id === url.id ? response.data : u))
      );
      onUpdate();
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="New Link"
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UrlUpdateForm;
