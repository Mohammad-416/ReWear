from django.shortcuts import render
import os
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv


load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

@api_view(['POST'])
def create_superuser(request):
    secret_key = request.data.get("secret_key")
    expected_key = os.getenv("SUPERUSER_SECRET_KEY")

    if secret_key != expected_key:
        return Response({"detail": "Invalid secret key."}, status=status.HTTP_400_BAD_REQUEST)

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not (username and email and password):
        return Response({"detail": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"detail": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)

    User.objects.create_superuser(username=username, email=email, password=password)
    return Response({"detail": "Superuser created."}, status=status.HTTP_201_CREATED)
