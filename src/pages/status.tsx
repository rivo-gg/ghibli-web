import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Nav from "@/components/nav";
import styles from "@/styles/Status.module.css";
import { Line, Bar } from "react-chartjs-2";
import dynamic from "next/dynamic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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

export const options2 = {
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

const dayMap: any = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const getPastWeekDays = () => {
  const today = new Date();
  const pastWeekDays = [];

  for (let i = 0; i < 7; i++) {
    const pastDay = new Date(today);
    pastDay.setDate(today.getDate() - i);
    pastWeekDays.unshift(dayMap[pastDay.getDay()]);
  }

  return pastWeekDays;
};

export const data = {
  labels: getPastWeekDays(),
  datasets: [
    {
      label: "Requests",
      data: [827, 888, 895, 484, 813, 565, 1880], // Example request data for each day
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

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = currentDate.getFullYear();

const formattedDate = `${day}.${month}.${year}`;

const stylesstatus = {
  legend: {
    fontSize: "20px",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    marginbottom: "10px",
    margin: "10px",
  },
};

const Status = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [reqCounts, setReqCounts] = useState();
  const [urls, setUrls] = useState();

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

  useEffect(() => {
    fetch(`https://ghibli.rest/stats`)
      .then((response) => response.json())
      .then((data) => {
        const responseData = data[formattedDate];
        console.log(responseData);
        setUrls(responseData.map((item: any) => item.url));
        setReqCounts(responseData.map((item: any) => item.req));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  console.log(reqCounts);

  let data2 = {
    labels: urls,
    datasets: [
      {
        label: "Usage",
        data: reqCounts, // Example request data for each day
        fill: true,
        backgroundColor: "rgba(255,255,255,0.5)",
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

  return (
    <>
      <main className={`${styles.main}`}>
        <Nav />
        <div className={`${styles.status}`}>
          <h1>{}</h1>
          <h1 className={`${styles.title}`}>
            Ghibli.rest is {isOnline ? "online" : "offline"}
          </h1>
          <span
            className={`${isOnline ? styles.online : styles.offline}`}
          ></span>
        </div>
        <div className={`${styles.container}`}>
          <h1 style={stylesstatus.legend}>Requests in the past 7 days</h1>
          <Line options={options} data={data} draggable={false} />
          <h1 style={stylesstatus.legend}>Endpoint usage</h1>
          <Bar options={options2} data={data2} />
        </div>
      </main>
    </>
  );
};

export default dynamic(() => Promise.resolve(Status), { ssr: false });
