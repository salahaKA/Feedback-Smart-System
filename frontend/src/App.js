import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";

const API_URL = "http://127.0.0.1:8000/api/feedback/";

function App() {
  const [name, setName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !feedbackText.trim()) return;

    setSubmitting(true);
    try {
      await axios.post(API_URL, {
        user_name: name,
        feedback_text: feedbackText,
      });
      setName("");
      setFeedbackText("");
      fetchFeedbacks(); // Refresh list
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          🧠 FeedSmart Feedback
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Your Feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            fullWidth
            required
            multiline
            rows={3}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
            sx={{ mt: 2 }}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Recent Feedback
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : feedbacks.length === 0 ? (
          <Typography color="text.secondary">No feedback yet.</Typography>
        ) : (
          feedbacks.map((fb) => (
            <Paper key={fb.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography fontWeight="bold">{fb.name}</Typography>
              <Typography>{fb.feedback_text}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Sentiment: <strong>{fb.sentiment}</strong>
              </Typography>
            </Paper>
          ))
        )}
      </Paper>
    </Container>
  );
}

export default App;
