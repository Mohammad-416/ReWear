from django.urls import path
from .views import SwapRequestCreateView

urlpatterns = [
    path('request/', SwapRequestCreateView.as_view(), name='swap-request'),
]
