from django.db import models
from django.conf import settings
from items.models import Item

class Redemption(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    points_spent = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
