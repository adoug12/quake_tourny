import React from 'react';
import { Chart } from 'react-google-charts';

export default props => {
  const options = {
    width: 120,
    height: 120,
    redFrom: 2500,
    redTo: 3000,
    yellowFrom: 2200,
    yellowTo: 2500,
    minorTicks: 5,
    max: 3000
  };

  const gaugeData = [['Label', 'Value'], ['Rating', props.player.duelRating]];

  return <Chart chartType="Gauge" data={gaugeData} options={options} />;
};
