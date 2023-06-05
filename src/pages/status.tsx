import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Nav from "@/components/nav";
import styles from "@/styles/Status.module.css";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

export const data = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  datasets: [
    {
      label: "Requests",
      data: [233, 827, 888, 895, 484, 813, 565], // Example request data for each day
      fill: true,
      borderColor: "rgba(255,255,255,1)",
      tension: 0.4,
    },
  ],
  options: {
    title: {
      text: "Hello",
      display: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  },
};

const stylesstatus = {
  legend: {
    fontSize: "20px",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    marginbottom: "10px",
    margin: "10px",
  },
};

export default function Status() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch("https://ghibli.rest/ping");
        if (response.ok) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } catch (error) {
        setIsOnline(false);
      }
    };

    checkApiStatus();
  }, []);

  return (
    <>
      <main className={`${styles.main}`}>
        <Nav />
        <div className={`${styles.status}`}>
          <h1 className={`${styles.title}`}>
            Ghibli.rest is {isOnline ? "online" : "offline"}
          </h1>
          <span
            className={`${isOnline ? styles.online : styles.offline}`}
          ></span>
        </div>
        <div className={`${styles.container}`}>
          <h1 style={stylesstatus.legend}>API requests past 7 days</h1>
          <Line options={options} data={data} draggable={false} />
        </div>
      </main>
    </>
  );
}
