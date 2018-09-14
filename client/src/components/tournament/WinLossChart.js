import React from 'react';
import { Chart } from 'react-google-charts';

export default props => {
  const getRatio = player => {
    const won = player.duelStats.won;
    const lost = player.duelStats.lost;
    const total = won + lost;
    return won / total / (lost / total);
  };

  const data = [
    ['Name', 'Ratio', { role: 'style' }],
    [props.player1.name, getRatio(props.player1), 'color: #007BFF'],
    [props.player2.name, getRatio(props.player2), 'color: #DE3545']
  ];

  return (
    <Chart
      chartType="BarChart"
      data={data}
      options={{
        title: 'W/L Ratio',
        legend: { position: 'none' },
        animation: {
          duration: 500,
          startup: true,
          easing: 'inAndOut'
        },
        hAxis: {
          title: '',
          baseline: 0
        },
        vAxis: {
          textPosition: 'none'
        }
      }}
    />
  );
};
