from rest_framework import generics, permissions
from .models import Redemption
from .serializers import RedemptionSerializer
from items.models import Item
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework import status

@method_decorator(csrf_exempt, name='dispatch')
class RedeemItemView(generics.CreateAPIView):
    serializer_class = RedemptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        item_id = request.data.get("item_id")
        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"detail": "Item not found."}, status=status.HTTP_404_NOT_FOUND)

        if not item.approved or item.status != "available":
            return Response({"detail": "Item is not available."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        if user.points < item.point_value:
            return Response({"detail": "Insufficient points."}, status=status.HTTP_400_BAD_REQUEST)

        # Deduct points and update status
        user.points -= item.point_value
        user.save()

        item.status = "redeemed"
        item.save()

        redemption = Redemption.objects.create(user=user, item=item, points_spent=item.point_value)

        return Response({"message": "Item redeemed successfully."}, status=status.HTTP_201_CREATED)
