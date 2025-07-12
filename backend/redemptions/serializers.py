from rest_framework import serializers
from .models import Redemption

class RedemptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Redemption
        fields = '__all__'
        read_only_fields = ['user', 'points_spent', 'created_at']
