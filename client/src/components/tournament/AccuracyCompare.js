import React from 'react';
import { Chart } from 'react-google-charts';

export default props => {
  const player1 = props.player1.weaponStats;
  const player2 = props.player2.weaponStats;

  const getPercentage = (hits, shots) => {
    return (hits * 100) / shots;
  };

  const columnData = [
    ['Weapon', props.player1.name, props.player2.name],
    [
      'MG',
      getPercentage(player1.MACHINEGUN.hits, player1.MACHINEGUN.shots),
      getPercentage(player2.MACHINEGUN.hits, player2.MACHINEGUN.shots)
    ],
    [
      'HMG',
      getPercentage(
        player1.MACHINEGUN_GRADE1.hits,
        player1.MACHINEGUN_GRADE1.shots
      ),
      getPercentage(
        player2.MACHINEGUN_GRADE1.hits,
        player2.MACHINEGUN_GRADE1.shots
      )
    ],
    [
      'SG',
      getPercentage(player1.SHOTGUN.hits, player1.SHOTGUN.shots),
      getPercentage(player2.SHOTGUN.hits, player2.SHOTGUN.shots)
    ],
    [
      'SSG',
      getPercentage(player1.SHOTGUN_GRADE1.hits, player1.SHOTGUN_GRADE1.shots),
      getPercentage(player2.SHOTGUN_GRADE1.hits, player2.SHOTGUN_GRADE1.shots)
    ],
    [
      'NG',
      getPercentage(player1.NAILGUN.hits, player1.NAILGUN.shots),
      getPercentage(player2.NAILGUN.hits, player2.NAILGUN.shots)
    ],
    [
      'SNG',
      getPercentage(player1.NAILGUN_GRADE1.hits, player1.NAILGUN_GRADE1.shots),
      getPercentage(player2.NAILGUN_GRADE1.hits, player2.NAILGUN_GRADE1.shots)
    ],
    [
      'RL',
      getPercentage(
        player1.ROCKET_LAUNCHER.hits,
        player1.ROCKET_LAUNCHER.shots
      ),
      getPercentage(player2.ROCKET_LAUNCHER.hits, player2.ROCKET_LAUNCHER.shots)
    ],
    [
      'LG',
      getPercentage(player1.LIGHTNING_GUN.hits, player1.LIGHTNING_GUN.shots),
      getPercentage(player2.LIGHTNING_GUN.hits, player2.LIGHTNING_GUN.shots)
    ],
    [
      'RG',
      getPercentage(player1.RAILGUN.hits, player1.RAILGUN.shots),
      getPercentage(player2.RAILGUN.hits, player2.RAILGUN.shots)
    ],
    [
      'TB',
      getPercentage(player1.LAGBOLT.hits, player1.LAGBOLT.shots),
      getPercentage(player2.LAGBOLT.hits, player2.LAGBOLT.shots)
    ]
  ];

  return (
    <Chart
      chartType="ColumnChart"
      width="300"
      data={columnData}
      options={{
        legend: { position: 'none' },
        title: 'Accuracies',
        height: '200',
        animation: {
          duration: 500,
          startup: true,
          easing: 'inAndOut'
        }
      }}
    />
  );
};
