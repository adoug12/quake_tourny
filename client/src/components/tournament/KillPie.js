import React from 'react';
import { Chart } from 'react-google-charts';

export default props => {
  const pieData = [
    ['Weapon', 'Kills'],
    ['MG', props.weaponStats.MACHINEGUN.kills],
    ['HMG', props.weaponStats.MACHINEGUN_GRADE1.kills],
    ['SG', props.weaponStats.SHOTGUN.kills],
    ['SSG', props.weaponStats.SHOTGUN_GRADE1.kills],
    ['NG', props.weaponStats.NAILGUN.kills],
    ['SNG', props.weaponStats.NAILGUN_GRADE1.kills],
    ['RL', props.weaponStats.ROCKET_LAUNCHER.kills],
    ['LG', props.weaponStats.LIGHTNING_GUN.kills],
    ['RG', props.weaponStats.RAILGUN.kills],
    ['TB', props.weaponStats.LAGBOLT.kills]
  ];

  return (
    <Chart
      chartType="PieChart"
      data={pieData}
      options={{
        legend: { position: 'none' },
        width: 300,
        height: 300,
        title: 'Kills',
        colors: props.colors
      }}
      graph_id="KillPie"
      legend_toggle
    />
  );
};
