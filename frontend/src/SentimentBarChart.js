// src/SentimentBarChart.js
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const SentimentBarChart = ({ feedbacks }) => {
  const sentimentCounts = {
    Positive: 0,
    Neutral: 0,
    Negative: 0,
  };

  feedbacks.forEach((fb) => {
    const sentiment = fb.sentiment;
    if (sentimentCounts[sentiment] !== undefined) {
      sentimentCounts[sentiment]++;
    }
  });

  const chartData = Object.entries(sentimentCounts).map(([key, value]) => ({
    sentiment: key,
    count: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sentiment" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SentimentBarChart;
