from django.urls import path
from .views import create_superuser, RegisterView

urlpatterns = [
    path('create-superuser/', create_superuser),
    path('register/', RegisterView.as_view(), name='register'),
]
