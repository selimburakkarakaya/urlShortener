import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import UrlUpdateForm from './UrlUpdateForm';

interface UrlListProps {
  urls: { id: number; description: string; originalUrl: string; shortUrl: string }[];
  setUrls: React.Dispatch<React.SetStateAction<{ id: number; description: string; originalUrl: string; shortUrl: string }[]>>;
}

const UrlList: React.FC<UrlListProps> = ({ urls, setUrls }) => {
  const [editId, setEditId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/urls/${id}`);
      console.log('Delete response:', response.data);

      setUrls(prevUrls => prevUrls.filter(url => url.id !== id));
    } catch (error) {
      console.error('Error deleting URL: ', error);
    }
  };

  const getUrlById = (id: number) => {
    return urls.find(url => url.id === id);
  };

  return (
    <div>
      {editId && (
        <UrlUpdateForm
          url={getUrlById(editId)}
          onUpdate={() => setEditId(null)}
          setUrls={setUrls}
        />
      )}
      {urls.map((url) => (
        <div key={url.id} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '32px' }}>
          <p style={{ width: '100%' }}>{url.description}</p>
          <Link href={url.originalUrl.startsWith('http') ? url.originalUrl : `https://${url.originalUrl}`} passHref>
            <a target='_blank' rel='noopener noreferrer'>{url.shortUrl}</a>
          </Link>
          <button style={{ width: '7%' }} onClick={() => setEditId(url.id)}>Düzelt</button>
          <button style={{ width: '4%' }} onClick={() => handleDelete(url.id)}>Sil</button>
        </div>
      ))}
    </div>
  );
};

export default UrlList;
