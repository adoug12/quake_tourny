import React from 'react';
import { Chart } from 'react-google-charts';

export default props => {
  const pieData = [
    ['Weapon', 'Damage'],
    ['MG', props.weaponStats.MACHINEGUN.damage],
    ['HMG', props.weaponStats.MACHINEGUN_GRADE1.damage],
    ['SG', props.weaponStats.SHOTGUN.damage],
    ['SSG', props.weaponStats.SHOTGUN_GRADE1.damage],
    ['NG', props.weaponStats.NAILGUN.damage],
    ['SNG', props.weaponStats.NAILGUN_GRADE1.damage],
    ['RL', props.weaponStats.ROCKET_LAUNCHER.damage],
    ['LG', props.weaponStats.LIGHTNING_GUN.damage],
    ['RG', props.weaponStats.RAILGUN.damage],
    ['TB', props.weaponStats.LAGBOLT.damage]
  ];

  return (
    <Chart
      chartType="PieChart"
      data={pieData}
      options={{
        legend: { position: 'none' },
        width: 300,
        height: 300,
        title: 'Damage',
        colors: props.colors
      }}
      graph_id="DamagePie"
      legend_toggle
    />
  );
};
