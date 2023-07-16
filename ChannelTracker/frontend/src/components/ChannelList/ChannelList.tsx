import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Channel {
  id: number;
  name: string;
  clientCount: number;
}

const ChannelList: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/channels');
        console.log(response.data);
        setChannels(response.data['hydra:member']);
      } catch (error) {
        console.error("Error fetching channels: ", error);
      }
    };

    fetchChannels();
  }, []);

  const handleDeleteChannel = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/channels/${id}`);
      setChannels(channels.filter(channel => channel.id !== id));
    } catch (error) {
      console.error(`Error deleting channel with id ${id}: `, error);
    }
  };

  const handleEditChannel = (id: number) => {
    navigate(`/channels/${id}/edit`);
  };

  return (
    <div>
      <h1>Kanały</h1>
      {channels.map(channel => (
        <div key={channel.id}>
          <h2>{channel.name}</h2>
          <p>Ilość klientów: {channel.clientCount}</p>
          <button onClick={() => handleEditChannel(channel.id)}>Edytuj</button>
          <button onClick={() => handleDeleteChannel(channel.id)}>Usuń</button>
        </div>
      ))}
      <Link to="/channels/new">Dodaj nowy kanał</Link>
    </div>
  );
};

export default ChannelList;
