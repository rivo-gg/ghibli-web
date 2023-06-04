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
import styles from "@/styles/Home.module.css";
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
      tension: 0.3,
    },
  ],
};

const stylesstatus = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1.5px solid #b96c35",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#b96c353a",
  },
  legend: {
    fontSize: "20px",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    marginbottom: "10px",
    margin: "10px",
  },
  title: {
    fontSize: "20px",
    margintop: "20px",
    padding: "0",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
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

  const getStatusText = () => {
    if (isOnline) {
      return "Ghibli REST is online";
    } else if (!isOnline) {
      return "Ghibli REST is offline";
    } else {
      return "Ghibli REST is depreciated";
    }
  };

  const getDotColor = () => {
    if (isOnline) {
      return "#1BC573";
    } else if (!isOnline) {
      return "#DE3A3A";
    } else {
        return "#F5A623";
    }
  };
  return (
    <>
      <main className={styles.main}>
        <Nav />
        <div className={styles.status}>
          <h1 style={stylesstatus.title}>{getStatusText()}</h1>
          <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="20"
              cy="20"
              fill="none"
              r="10"
              stroke={getDotColor()}
              stroke-width="2"
            >
              <animate
                attributeName="r"
                from="8"
                to="20"
                dur="1.5s"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1.5s"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="20" cy="20" fill={getDotColor()} r="10" />
          </svg>
        </div>
        <div style={stylesstatus.container}>
          <h1 style={stylesstatus.legend}>API requests past 7 days</h1>
          <Line options={options} data={data} />
        </div>
      </main>
    </>
  );
}
