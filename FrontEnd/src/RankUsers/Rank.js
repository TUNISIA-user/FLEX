import React, { useEffect, useState } from "react";
import axios from "../Component/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CircleAnimation from "./CircleAnimation";

// CustomizedDot component to render each point's image
const CustomizedDot = (props) => {
  const { cx, cy, payload } = props;

  return (
    <svg x={cx - 20} y={cy - 20} width={40} height={40}>
      <foreignObject width="100%" height="100%">
        <img
          src={payload.img}
          alt="Data Point"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px solid #8884d8",
          }}
        />
      </foreignObject>
    </svg>
  );
};

// Custom Tooltip to display user data and image
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, img, pv } = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={img}
          alt={name}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            marginRight: 10,
          }}
        />
        <div>
          <p style={{ margin: 0, fontWeight: "bold" }}>{name}</p>
          <p style={{ margin: 0 }}>Value: {pv}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default function Rank() {
  const [datax, setDatax] = useState([]); // Store the chart data properly
  const [dynamic, setDynamic] = useState([]); // Store API data

  // Function to update ranks
  const updateRanksPeople = async () => {
    try {
      const { data } = await axios.get(`/getScoreRank`);
      setDynamic(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch ranks on component mount
  useEffect(() => {
    updateRanksPeople();
  }, []);

  // Update chart data when dynamic data changes
  useEffect(() => {
    const newData = dynamic.map((item) => ({
      name: item.email,
      uv: 4000,
      pv: item.ScoreRank,
      amt: 2400,
      img: `${process.env.REACT_APP_API_KEY}/${item.imgUser}`,
    }));
    setDatax(newData);
  }, [dynamic]);

  const chartWidth = datax.length * 150;

  return (
    <div style={{ backgroundColor: "#0e1217", width: "100%", overflowX: "auto" }}>
      {datax.length > 0 ? (
        <LineChart
          width={chartWidth}
          height={700}
          data={datax}
          margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"  
            stroke="#8884d8"
            dot={<CustomizedDot />}
          />
        </LineChart>
      ) : (
        <p style={{ color: "#fff", textAlign: "center" }}>Loading chart data...</p>
      )}
      <CircleAnimation />
    </div>
  );
}
