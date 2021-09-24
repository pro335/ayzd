import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import Chart from 'react-apexcharts'

/* This example requires Tailwind CSS v2.0+ */

export default function Score() {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const options = {
    chart: {
      toolbar: {
        show: false,
      }
    },
    labels: [
      'Utility',
      'Uniqueness',
      'Comunity',
      'Team',
      'Viral Potential',
      'Visual Potential'
    ],
    fill: {
      opacity: 0.25,
      colors: ['#7B61FF'],
    },
    stroke: {
      colors: ['#7b61ff']
    },
    markers: {
      size: 7,
      colors: ['#7b61ff'],
      strokeWidth: 1,
      strokeColors: '#000'
    },
    yaxis: {
      // min:4,
      // max:10,
      labels: {
        offsetY: 20,
        style: {
          colors: '#fff',
          fontFamily: 'Inter',
          fontSize: '0.8vw'
        }
      }
    },
    xaxis: {
      labels: {
        style: {
          fontFamily: 'Inter',
          fontSize: '1vw',
          colors: 'rgba(204,204,204,0.25)'

        }
      }
    },
    tooltip: {
      theme: 'dark',

    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: 'rgba(204, 204, 204, 0.25)',
          connectorColors: 'rgba(204, 204, 204, 0.25)'
        }
      }
    }
  }

  const series = [
    {
      name: 'Score',
      data: [6, 9, 9, 6.5, 9.2, 8]
    }
  ]

  return (
    <div className="">
      <Chart options={options} series={series} type="radar" width="100%" />
    </div>
  )
}
