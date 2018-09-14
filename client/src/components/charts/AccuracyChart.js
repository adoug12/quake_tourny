import React from 'react';
import { Chart } from 'react-google-charts';

export default props => {
  const columnData = [
    ['Weapon', 'Accuracy', { role: 'style' }],
    [
      'MG',
      (props.weaponStats.MACHINEGUN.hits * 100) /
        props.weaponStats.MACHINEGUN.shots,
      props.colors[0]
    ],
    [
      'HMG',
      (props.weaponStats.MACHINEGUN_GRADE1.hits * 100) /
        props.weaponStats.MACHINEGUN_GRADE1.shots,
      props.colors[1]
    ],
    [
      'SG',
      (props.weaponStats.SHOTGUN.hits * 100) / props.weaponStats.SHOTGUN.shots,
      props.colors[2]
    ],
    [
      'SSG',
      (props.weaponStats.SHOTGUN_GRADE1.hits * 100) /
        props.weaponStats.SHOTGUN_GRADE1.shots,
      props.colors[3]
    ],
    [
      'NG',
      (props.weaponStats.NAILGUN.hits * 100) / props.weaponStats.NAILGUN.shots,
      props.colors[4]
    ],
    [
      'SNG',
      (props.weaponStats.NAILGUN_GRADE1.hits * 100) /
        props.weaponStats.NAILGUN_GRADE1.shots,
      props.colors[5]
    ],
    [
      'RL',
      (props.weaponStats.ROCKET_LAUNCHER.hits * 100) /
        props.weaponStats.ROCKET_LAUNCHER.shots,
      props.colors[6]
    ],
    [
      'LG',
      (props.weaponStats.LIGHTNING_GUN.hits * 100) /
        props.weaponStats.LIGHTNING_GUN.shots,
      props.colors[7]
    ],
    [
      'RG',
      (props.weaponStats.RAILGUN.hits * 100) / props.weaponStats.RAILGUN.shots,
      props.colors[8]
    ],
    [
      'TB',
      (props.weaponStats.LAGBOLT.hits * 100) / props.weaponStats.LAGBOLT.shots,
      props.colors[9]
    ]
  ];

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      data={columnData}
      options={{
        legend: { position: 'none' },
        title: 'Accuracies',
        height: '200',
        colors: props.colors,
        animation: {
          duration: 500,
          startup: true,
          easing: 'inAndOut'
        }
      }}
    />
  );
};
