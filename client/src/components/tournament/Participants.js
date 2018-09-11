import React from 'react';
import Spinner from '../Spinner';
import { Chart } from 'react-google-charts';

export default props => {
  const options = {
    width: 400,
    height: 120,
    redFrom: 2500,
    redTo: 3000,
    yellowFrom: 2200,
    yellowTo: 2500,
    minorTicks: 5,
    max: 3000
  };

  let players = props.participants.data;

  let gaugeData = [['Label', 'Value'], ['Rating', players[0].duelRating]];

  let columnData = [
    ['Weapon', 'Accuracy', { role: 'style' }],
    [
      'MG',
      (players[0].weaponStats.MACHINEGUN.hits * 100) /
        players[0].weaponStats.MACHINEGUN.shots,
      '#b87333'
    ],
    [
      'HMG',
      (players[0].weaponStats.MACHINEGUN_GRADE1.hits * 100) /
        players[0].weaponStats.MACHINEGUN_GRADE1.shots,
      '#b87333'
    ],
    [
      'SG',
      (players[0].weaponStats.SHOTGUN.hits * 100) /
        players[0].weaponStats.SHOTGUN.shots,
      '#b87333'
    ],
    [
      'SSG',
      (players[0].weaponStats.SHOTGUN_GRADE1.hits * 100) /
        players[0].weaponStats.SHOTGUN_GRADE1.shots,
      '#b87333'
    ],
    [
      'NG',
      (players[0].weaponStats.NAILGUN.hits * 100) /
        players[0].weaponStats.NAILGUN.shots,
      '#b87333'
    ],
    [
      'SNG',
      (players[0].weaponStats.NAILGUN_GRADE1.hits * 100) /
        players[0].weaponStats.NAILGUN_GRADE1.shots,
      '#b87333'
    ],
    [
      'RL',
      (players[0].weaponStats.ROCKET_LAUNCHER.hits * 100) /
        players[0].weaponStats.ROCKET_LAUNCHER.shots,
      '#b87333'
    ],
    [
      'LG',
      (players[0].weaponStats.LIGHTNING_GUN.hits * 100) /
        players[0].weaponStats.LIGHTNING_GUN.shots,
      '#b87333'
    ],
    [
      'RG',
      (players[0].weaponStats.RAILGUN.hits * 100) /
        players[0].weaponStats.RAILGUN.shots,
      '#b87333'
    ],
    [
      'TB',
      (players[0].weaponStats.LAGBOLT.hits * 100) /
        players[0].weaponStats.LAGBOLT.shots,
      '#b87333'
    ]
  ];

  let pieData = [
    ['Weapon', 'Kills'],
    ['MG', players[0].weaponStats.MACHINEGUN.kills],
    ['HMG', players[0].weaponStats.MACHINEGUN_GRADE1.kills],
    ['SG', players[0].weaponStats.SHOTGUN.kills],
    ['SSG', players[0].weaponStats.SHOTGUN_GRADE1.kills],
    ['NG', players[0].weaponStats.NAILGUN.kills],
    ['SNG', players[0].weaponStats.NAILGUN_GRADE1.kills],
    ['RL', players[0].weaponStats.ROCKET_LAUNCHER.kills],
    ['LG', players[0].weaponStats.LIGHTNING_GUN.kills],
    ['RG', players[0].weaponStats.RAILGUN.kills],
    ['TB', players[0].weaponStats.LAGBOLT.kills]
  ];

  let pie2Data = [
    ['Weapon', 'Damage'],
    ['MG', players[0].weaponStats.MACHINEGUN.damage],
    ['HMG', players[0].weaponStats.MACHINEGUN_GRADE1.damage],
    ['SG', players[0].weaponStats.SHOTGUN.damage],
    ['SSG', players[0].weaponStats.SHOTGUN_GRADE1.damage],
    ['NG', players[0].weaponStats.NAILGUN.damage],
    ['SNG', players[0].weaponStats.NAILGUN_GRADE1.damage],
    ['RL', players[0].weaponStats.ROCKET_LAUNCHER.damage],
    ['LG', players[0].weaponStats.LIGHTNING_GUN.damage],
    ['RG', players[0].weaponStats.RAILGUN.damage],
    ['TB', players[0].weaponStats.LAGBOLT.damage]
  ];

  if (props.participants.loading) {
    return <Spinner />;
  } else {
    return (
      <div className="container border-left border-right border-bottom">
        <div className="row">
          <div className="col-md-3 p-4">
            <ul className="list-group">
              {props.participants.data.map((player, index) => (
                <li key={index} className="list-group-item">
                  {player.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <Chart chartType="Gauge" data={gaugeData} options={options} />
            <Chart
              chartType="PieChart"
              data={pieData}
              options={{ legend: { position: 'none' } }}
              graph_id="PieChart"
              legend_toggle
            />
            <Chart
              chartType="PieChart"
              data={pie2Data}
              options={{ legend: { position: 'none' } }}
              graph_id="PieChart"
              legend_toggle
            />
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={columnData}
              options={{ legend: { position: 'none' } }}
            />
          </div>
        </div>
      </div>
    );
  }
};
