from django.db import models

# Create your models here.
class Feedback(models.Model):
    user_name = models.CharField(max_length=100)
    feedback_text = models.TextField()
    sentiment = models.CharField(max_length=20) # e.g., 'positive', 'negative', 'neutral'
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_name} - {self.sentiment}"