from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    pass

class Profile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class Address(models.Model):
    pass