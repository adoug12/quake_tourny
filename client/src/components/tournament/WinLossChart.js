import React from 'react'
import { Chart } from 'react-google-charts';

export default (props) => {

  const data = [
    ["Name", "Ratio", { role: "style" }],
    [props.player1.name, props.player1.duelStats.won / (props.player1.duelStats.won + props.player1.duelStats.lost), "#007BFF"],
    [props.player2.name, props.player2.duelStats.won / (props.player2.duelStats.won + props.player2.duelStats.lost), "#DE3545"]
  ];

  return (
    <Chart chartType="Bar" data={data} options={{chart: {title: 'W/L Ratio'}, bars: 'horizontal', legend: { position: 'none' }}} />
  )
}
