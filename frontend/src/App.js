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
  Toolbar,
  Stack,
  Chip,
  IconButton,
  AppBar,
} from "@mui/material";

import FeedbackIcon from "@mui/icons-material/Feedback";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const API_URL = "http://127.0.0.1:8000/api/feedback/";

function App() {
  const [name, setName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode,
    },
  });

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

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "success";
      case "negative":
        return "error";
      case "neutral":
        return "default";
      default:
        return "default";
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <>
        {/* <AppBar position="static">
        <Toolbar>
          <FeedbackIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            FeedSmart – AI Feedback
          </Typography>
        </Toolbar>
      </AppBar> */}
        <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
          <Toolbar>
            <FeedbackIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FeedSmart – AI Feedback 🧠
            </Typography>
            <IconButton
              color="inherit"
              onClick={() =>
                setMode((prev) => (prev === "light" ? "dark" : "light"))
              }
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              ✍️ Submit Your Feedback
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
                sx={{
                  mt: 2,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#115293" },
                }}
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </Box>
          </Paper>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            📝 Recent Feedback
          </Typography>

          {loading ? (
            <Box textAlign="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : feedbacks.length === 0 ? (
            <Typography color="text.secondary">No feedback yet.</Typography>
          ) : (
            feedbacks.map((fb) => (
              <Paper
                key={fb.id}
                variant="outlined"
                sx={{ p: 3, mb: 2, borderRadius: 2, boxShadow: 2 }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight="bold">{fb.user_name}</Typography>
                  <Chip
                    label={fb.sentiment}
                    color={getSentimentColor(fb.sentiment)}
                  />
                </Stack>
                <Typography sx={{ mt: 1 }}>{fb.feedback_text}</Typography>
              </Paper>
            ))
          )}
        </Container>
      </>
    </ThemeProvider>
  );
}

export default App;
