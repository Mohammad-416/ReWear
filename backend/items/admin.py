from django.contrib import admin
from .models import Item

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'uploader', 'approved']
    list_filter = ['status', 'approved', 'category']
    search_fields = ['title', 'tags']
