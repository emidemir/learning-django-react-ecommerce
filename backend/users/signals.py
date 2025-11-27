from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import CustomUser, Profile

@receiver(post_save, CustomUser)
def create_profile(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)