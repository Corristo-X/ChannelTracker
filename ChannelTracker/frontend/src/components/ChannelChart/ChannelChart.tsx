import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface Channel {
  id: number;
  name: string;
  client_count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4E50', '#EFC1D1', '#6A0572'];

const chartStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 1000,
    width:1000,
  };
const ChannelChart: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios.get('http://localhost:8000/api/channels');
      setChannels(response.data['hydra:member']);
    };

    fetchChannels();
  }, []);
  return (
    <div style={chartStyle}>
      <h1>Wykres</h1>
    <PieChart width={800} height={400}>
      <Pie
        dataKey="clientCount"
        isAnimationActive={false}
        data={channels}
        cx={500}
        cy={200}
        outerRadius={150}
        
        fill="#8884d8"
        label={({ name, clientCount, percent }) =>
          `${name} (${clientCount} - ${Math.round(percent * 100)}%)`
        }
      >
        {channels.map((channel, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </div>
  );
};

export default ChannelChart;
