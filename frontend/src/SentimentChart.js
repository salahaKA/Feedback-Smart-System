import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const COLORS = ["#4caf50", "#2196f3", "#f44336"];

const SentimentChart = ({ feedbacks }) => {
  const sentimentCounts = {
    Positive: 0,
    Neutral: 0,
    Negative: 0,
  };

  feedbacks.forEach((fb) => {
    const sentiment = fb.sentiment?.toLowerCase();
    if (sentiment === "positive") sentimentCounts.Positive++;
    else if (sentiment === "neutral") sentimentCounts.Neutral++;
    else if (sentiment === "negative") sentimentCounts.Negative++;
  });

  const data = Object.entries(sentimentCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        📊 Sentiment Distribution
      </Typography>
      {total === 0 ? (
        <Typography color="text.secondary">
          No feedback available for chart.
        </Typography>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default SentimentChart;
