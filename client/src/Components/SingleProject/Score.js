import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
// import Chart from 'react-apexcharts'
import { Radar } from "react-chartjs-2";

/* This example requires Tailwind CSS v2.0+ */

export default function Score() {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [score_team, setScore_team] = useState( isValid(project.projectData) && isValid(project.projectData.score_team) ? Number(project.projectData.score_team) : 0 );
  const [score_uniqueness, setScore_uniqueness] = useState( isValid(project.projectData) && isValid(project.projectData.score_uniqueness) ? Number(project.projectData.score_uniqueness) : 0 );
  const [score_community, setScore_community] = useState( isValid(project.projectData) && isValid(project.projectData.score_community) ? Number(project.projectData.score_community) : 0 );
  const [score_v_quality, setScore_v_quality] = useState( isValid(project.projectData) && isValid(project.projectData.score_v_quality) ? Number(project.projectData.score_v_quality) : 0 );
  const [score_v_potential, setScore_v_potential] = useState( isValid(project.projectData) && isValid(project.projectData.score_v_potential) ? Number(project.projectData.score_v_potential) : 0 );
  const [score_utility, setScore_utility] = useState( isValid(project.projectData) && isValid(project.projectData.score_utility) ? Number(project.projectData.score_utility) : 0 );

  return (
    <div className="p-0 lg:p-5">
      <Radar
        data={{
          labels: [
            "Utility",
            "Uniqueness",
            "Comunity",
            "Team",
            "Viral Potential",
            "Visual Quality",
          ],
          datasets: [
            {
              label: "Score",
              data: [score_utility, score_uniqueness, score_community, score_team, score_v_potential, score_v_quality],
              backgroundColor: "rgba(123, 97, 255,0.25)",
              borderColor: "rgba(123, 97, 255, 1)",
              borderWidth: 1,
              pointBackgroundColor: "rgba(123, 97, 255, 1)",
              pointBorderColor: "#000",
              pointRadius: 5,
              pointHoverRadius: 5,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              displayColors: false,
              bodyAlign: "center",
              callbacks: {
                title: (tooltipItem) => tooltipItem[0].label,
                label: (tooltipItem) => tooltipItem.formattedValue,
              },
            },
          },
          scales: {
            r: {
              beginAtZero: false,
              suggestedMin: 3,
              suggestedMax: 10,
              angleLines: {
                color: "rgba(100, 100, 100, 0.35)",
              },
              grid: {
                color: "rgba(100, 100, 100, 0.35)",
              },
              ticks: {
                color: "#fff",
                showLabelBackdrop: false,
                // stepSize: width <= 768 ? 2 : 1,
              },
              pointLabels: {
                color: "rgba(100, 100, 100, 1)",
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      />
    </div>

  )
}
