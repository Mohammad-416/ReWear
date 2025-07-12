from django.shortcuts import render
from django.contrib.auth.models import User
from dotenv import load_dotenv
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

User = get_user_model()

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

    return Response({"detail": "Superuser created successfully."}, status=status.HTTP_201_CREATED)

