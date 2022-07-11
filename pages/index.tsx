import React from 'react';
import styles from '../styles/Home.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CoreChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getStatements } from './api/statements';

interface Balance {
  balance: string;
  date: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = ({ balances }: { balances: Balance[] }) => {
  const labels = balances.map((balance) => balance.date);

  const data = {
    labels,
    datasets: [
      {
        label: 'Balances por mes',
        data: balances.map((balance) => balance.balance),
        borderColor: 'rgb(159, 132, 202)',
        backgroundColor: '#fff',
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1>Pastelerapp</h1>
      <div className="chart-holder">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            backgroundColor: 'white',
            aspectRatio: 2,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  padding: 40,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const balances = await getStatements();
  // Pass data to the page via props
  return { props: { balances } };
}

export default Home;
