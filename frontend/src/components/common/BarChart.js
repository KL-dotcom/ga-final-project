import React from 'react'


function BarChart({ text , user }) {



  const myFirstBarChartProps = {
    title: 'My first bar chart',
    data: [
      {
        seriesName: 'A',
        type: {
          x: DataType.NonNullNumeric,
          y: DataType.NonNullNumeric
        },
        points: [
          {
            x: 0,
            y: 10
          },
          {
            x: 1,
            y: 20
          },
          {
            x: 2,
            y: 30
          }
        ]
      }
    ],
    padding: { left: 10, right: 10, top: 10, bottom: 10 },
    xAxisConfig: {
      zeroIntercept: true,
      margin: 10,
      tickPlacement: Placement.Bucket,
      tickLength: 2
    },
    yAxisConfig: {
      zeroIntercept: true,
      margin: 10,
      tickPlacement: Placement.Aligned,
      tickLength: 2
    }
  }

  // ...

  return <BarChart {...firstBarChartProps}/>


}

export default BarChart