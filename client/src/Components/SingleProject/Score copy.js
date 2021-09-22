import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import { Radar } from 'react-chartjs-2';

const data = {
  labels: ['ddd', 'ccdd', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '',
      data: [6, 9, 3, 5, 8, 7],
      backgroundColor: 'rgba(123, 97, 255, 0.24)',
      borderColor: 'rgba(123, 97, 255, 1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(123, 97, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(123, 97, 255, 1)'
    },
  ],
};

// const options = {
//   scale: {
//     ticks: {
//       beginAtZero: true,
//       fontColor: 'white', // labels such as 10, 20, etc
//       showLabelBackdrop: false // hide square behind text
//     },
//     pointLabels: {
//       fontColor: 'white' // labels around the edge like 'Running'
//     },
//     gridLines: {
//       color: 'rgba(255, 255, 255, 0.2)'
//     },
//     angleLines: {
//       color: 'white' // lines radiating from the center
//     }
//   },
// };
const options = {
  legend: {
    position: 'top',
    labels: {
      fontColor: 'white'
    }
  },
  title: {
    display: true,
    text: 'Chart.js Radar Chart',
    fontColor: 'white'
  },
  scale: {
    ticks: {
      beginAtZero: true,
      fontColor: 'white', // labels such as 10, 20, etc
      showLabelBackdrop: false // hide square behind text
    },
    pointLabels: {
      fontColor: 'white' // labels around the edge like 'Running'
    },
    color: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo'],
    angleLines: {
      color: 'white' // lines radiating from the center
    }
  }
}

/* This example requires Tailwind CSS v2.0+ */

export default function Score() {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <div className="p-4 sm:p-5 space-y-4">
      <Radar data={data} options={options} />      
    </div>
  )
}
