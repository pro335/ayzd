// Graph goes from here
import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowNarrowUpIcon } from '@heroicons/react/outline'

const data = [
  {
    xAxis: 'Mon',
    value: 220000,
  },
  {
    xAxis: 'Tues',
    value: 150000,
  },
  {
    xAxis: 'Wed',
    value: 400000,
  },
  {
    xAxis: 'Thurs',
    value: 280000,
  },
  {
    xAxis: 'Fri',
    value: 390000,
  },
  {
    xAxis: 'Sat',
    value: 150000,
  },
  {
    xAxis: 'Sun',
    value: 400000,
  },
];

function nFormatter(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

const Statistics = () => {
  return (
    <div className="w-full h-full overflow-y-scroll px-5">
      <div className="grid lg:grid-cols-2 gap-5 lg:gap-8 my-8">
        <Graph />
        <Graph />
        <Graph />
        <Graph />
      </div>
    </div>
  )
}


const Graph = () => (
  <div className="bg-black border border-brand-gray-800 rounded-lg pb-8 overflow-hidden">
    <div className="bg-brand-gray-900 flex items-center justify-between px-5 py-3 border-b border-brand-gray-800">
      <div>
        <p className="text-xs font-medium">Sales volume</p>
        <h2 className="text-lg text-brand-gray-300 font-semibold leading-6">$503,201</h2>
      </div>
      <div className="bg-brand-green bg-opacity-20 rounded-full px-2 py-1">
        <p className="flex items-center text-sm font-medium text-brand-green">
          <ArrowNarrowUpIcon className="w-4 mr1" />
          12%
        </p>
      </div>
    </div>
    <ResponsiveContainer className="w-full py-5" height={200}>

      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 15
        }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6953d9" stopOpacity={0.7} />
            <stop offset="99%" stopColor="#6953d9" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis axisLine={false} tickLine={false} dataKey="xAxis" />

        <YAxis
          dataKey="value"
          domain={[100000, 500000]}
          type="number"
          axisLine={false}
          tickLine={false}
          tickFormatter={number => nFormatter(number)}
        />

        <Tooltip content={<CustomTooltip />} />

        <Area type="monotone" dataKey="value" stroke="#6953d9" strokeWidth="2" fill="url(#color)" />
      </AreaChart>

    </ResponsiveContainer>
  </div>
)

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) {
    return null;
  }

  return (
    <div className="bg-brand-gray-800 shadow-footer px-6 py-2 rounded-md">
      <p className="text-white">
        {nFormatter(payload[0].value)}
      </p>
      <p className="text-xs text-brand-gray-400">
        {label}
      </p>
    </div>
  )
}

export default Statistics
