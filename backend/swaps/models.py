from django.db import models
from django.conf import settings
from items.models import Item

class SwapRequest(models.Model):
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sent_swaps', on_delete=models.CASCADE)
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='received_swaps', on_delete=models.CASCADE)
    item_offered = models.ForeignKey(Item, related_name='offered_in_swaps', on_delete=models.CASCADE)
    item_requested = models.ForeignKey(Item, related_name='requested_in_swaps', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('declined', 'Declined')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
