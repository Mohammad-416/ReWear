from rest_framework import serializers
from .models import SwapRequest

class SwapRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SwapRequest
        fields = '__all__'
        read_only_fields = ['from_user', 'status', 'created_at']
