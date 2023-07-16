import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ChannelForm from './components/ChannelForm/ChannelForm';
import ChannelList from './components/ChannelList/ChannelList';
import ChannelChart from './components/ChannelChart/ChannelChart';
import { MemoryRouter } from 'react-router-dom';

interface Channel {
  id: number;
  name: string;
  clientCount: number;
}
const EditChannel: React.FC = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const response = await axios.get(`http://localhost:8000/api/channels/${id}`);
      console.log(response.data)
      setChannel(response.data)
    };

    fetchChannel();
  }, [id]);

  if (!channel) return <div>Loading...</div>;
  const handleChannelChange = () => {
  };

  return <ChannelForm initialValues={channel} onSubmit={handleChannelChange} />;
}
const AddChannel: React.FC = () => {
  const handleChannelChange = () => {
  };

  return <ChannelForm onSubmit={handleChannelChange} />;
};

const App: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios.get('http://localhost:8000/api/channels');
      setChannels(response.data['hydra:member']);
    };

    fetchChannels();
  }, []);
  const TestApp: React.FC = () => (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/channels">Kanały</Link>
          </li>
          <li>
            <Link to="/chart">Wykres</Link>
          </li>
        </ul>
      </nav>

      <Routes>
      <Route path="/channels/new" element={<AddChannel />} />
        <Route path="/channels/:id/edit" element={<EditChannel />} />
        <Route path="/channels" element={<ChannelList />} />
        <Route path="/chart" element={<ChannelChart />} />
        <Route path="/" element={<ChannelList />} />
      </Routes>
    </Router>
  );
};

export default App;
