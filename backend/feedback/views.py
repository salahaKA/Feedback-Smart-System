from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from textblob import TextBlob
from .models import Feedback
from .serializers import FeedbackSerializer


class FeedbackAPI(APIView):
    def get(self, request):
        feedbacks = Feedback.objects.all().order_by('-created_at')
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        feedback_text = data.get("feedback_text", "")
        blob = TextBlob(feedback_text)
        polarity = blob.sentiment.polarity

        sentiment = (
            "Positive" if polarity > 0 else
            "Negative" if polarity < 0 else
            "Neutral"
        )

        data["sentiment"] = sentiment
        serializer = FeedbackSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def root_home(request):
    return HttpResponse("✅ Welcome to FeedSmart API")
