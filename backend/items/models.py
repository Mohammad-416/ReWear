from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField

class Item(models.Model):
    CATEGORY_CHOICES = [
        ('Shirt', 'Shirt'),
        ('Pant', 'Pant'),
        ('Dress', 'Dress'),
        ('Other', 'Other'),
    ]
    TYPE_CHOICES = [
        ('Casual', 'Casual'),
        ('Formal', 'Formal'),
        ('Other', 'Other'),
    ]
    SIZE_CHOICES = [
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
    ]
    CONDITION_CHOICES = [
        ('New', 'New'),
        ('Good', 'Good'),
        ('Worn', 'Worn'),
    ]
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('pending', 'Pending'),
        ('swapped', 'Swapped'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)
    condition = models.CharField(max_length=10, choices=CONDITION_CHOICES)
    tags = models.TextField(blank=True)
    image = CloudinaryField('image')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='available')
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
