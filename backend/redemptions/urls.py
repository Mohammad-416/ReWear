from django.urls import path
from .views import RedeemItemView

urlpatterns = [
    path('redeem/', RedeemItemView.as_view(), name='redeem-item'),
]
