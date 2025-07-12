from django.urls import path
from .views import create_superuser, RegisterView, login_view, complete_profile, login_check

urlpatterns = [
    path('create-superuser/', create_superuser),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('islogin/', login_check, name='login-check'),
    path('complete-profile/', complete_profile, name='complete-profile'),
]
