import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler,
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
  Filler,
  Tooltip,
  Legend
);

export const optionData = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  title: {
    text: "",
    display: true,
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem: any) =>
        `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
      title: () => null,
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

const getLastDays: any = () => {
  const days: string[] = [];
  const today: Date = new Date();

  for (let i = 6; i >= 0; i--) {
    const tag: Date = new Date(today);
    tag.setDate(tag.getDate() - i);

    const tagString: string = tag.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    days.push(tagString);
  }

  return days;
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

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = currentDate.getFullYear();

const formattedDate = `${day}.${month}.${year}`;

const Status = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [reqCounts, setReqCounts] = useState();
  const [urls, setUrls] = useState();
  const [pastWeekData, setPastWeekData] = useState();

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
        setUrls(responseData.map((item: any) => item.url));
        setReqCounts(
          responseData.map((item: any) => (item.req ? item.req : 0))
        );

        let dayDataList: any = [];
        getLastDays().forEach((day: any) => {
          const dayData = data[day];
          if (dayData) {
            dayDataList.push(
              dayData
                .map((item: any) => item.req)
                .reduce((a: any, b: any) => a + b, 0)
            );
          } else {
            dayDataList.push(0);
          }
        });

        setPastWeekData(dayDataList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const data = {
    labels: getPastWeekDays(),
    datasets: [
      {
        label: "Requests",
        data: pastWeekData, // Example request data for each day
        fill: true,
        borderColor: "rgba(255,255,255,1)",
        backgroundColor: "rgba(255,255,255,0.4)",
        tension: 0.4,
      },
    ],
  };

  const data2 = {
    labels: urls,
    datasets: [
      {
        label: "Usage",
        data: reqCounts, // Example request data for each day
        backgroundColor: "rgba(255,255,255,0.5)",
        tension: 0.4,
      },
    ],
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
        <div className={`${styles.graphs}`}>
          <div className={`${styles.container}`}>
            <h1 className={styles.legend}>Requests in the past 7 days</h1>
            <Line options={optionData} data={data} draggable={false} />
          </div>
          <div className={`${styles.container}`}>
            <h1 className={styles.legend}>Most requested endpoints</h1>
            <Bar options={optionData} data={data2} draggable={false} />
          </div>
        </div>
      </main>
    </>
  );
};

export default dynamic(() => Promise.resolve(Status), { ssr: false });
