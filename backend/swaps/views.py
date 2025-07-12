from rest_framework import generics, permissions
from .models import SwapRequest
from .serializers import SwapRequestSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class SwapRequestCreateView(generics.CreateAPIView):
    queryset = SwapRequest.objects.all()
    serializer_class = SwapRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        item_requested = serializer.validated_data.get('item_requested')
        serializer.save(from_user=self.request.user, to_user=item_requested.uploader)
