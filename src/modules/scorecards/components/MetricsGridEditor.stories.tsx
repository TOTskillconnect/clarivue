import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MetricsGridEditor } from './MetricsGridEditor';

export default {
  title: 'Components/MetricsGridEditor',
  component: MetricsGridEditor,
};

const placeholders = [
  { id: uuidv4(), name: 'Technical Skills', description: 'Expertise in software dev & tools', weight: 25, score: 0 },
  { id: uuidv4(), name: 'Soft Skills', description: 'Communication, teamwork, adaptability', weight: 25, score: 0 },
  { id: uuidv4(), name: 'Experience', description: 'Years in industry & relevant projects', weight: 25, score: 0 },
  { id: uuidv4(), name: 'Culture Fit', description: 'Alignment with company values', weight: 25, score: 0 },
];

export const Default = () => (
  <div style={{ padding: 24, background: '#f5f5f5' }}>
    <MetricsGridEditor 
      initial={placeholders}
      onSave={metrics => console.log('Saved metrics:', metrics)}
      onCancel={() => console.log('Cancelled')}
    />
  </div>
);

export const Empty = () => (
  <div style={{ padding: 24, background: '#f5f5f5' }}>
    <MetricsGridEditor 
      initial={[]}
      onSave={metrics => console.log('Saved metrics:', metrics)}
      onCancel={() => console.log('Cancelled')}
    />
  </div>
); 