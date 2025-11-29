from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField

def avatar_upload_path(instance, file):
    return "users/{0}/{1}".format(instance.user.username, file)

# Create your models here.
class CustomUser(AbstractUser):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    pass

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='user')
    avatart = models.ImageField(avatar_upload_path, blank=True, null=True)
    class Gender(models.TextChoices):
        MALE = 'MALE', 'Male'
        FEMALE = 'FEMALE', 'Female'
        OTHER = 'OTHER', 'Other'
        NOT_SPECIFIED = 'NOT_SPECIFIED', 'Not Specified'

    gender = models.CharField(max_length=13, choices=Gender.choices, default=Gender.NOT_SPECIFIED)
    phoneNumber = PhoneNumberField(blank=True)
    isVerified = models.BooleanField(default=False)
    verificationCode = models.CharField(max_length=6, blank=False, null=True)


class Address(models.Model):
    profile = models.OneToOneField(Profile, related_name="addresses", on_delete=models.CASCADE)
    country = CountryField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=False, null=False)
    district = models.CharField(max_length=100, blank=False, null=False)
    street_address = models.CharField(max_length=250, blank=False, null=False)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    primary = models.BooleanField(default=False)
    phone_number = PhoneNumberField(null=True, blank=True)
    building_number = models.IntegerField(
        blank=True, null=True, validators=[
            MinValueValidator(1, 'Building number can\'t be negative'),
            MaxValueValidator(99, 'Building number can\'t be more than 99')
        ]
    )
    apartment_number = models.IntegerField(
        blank=True, null=True, validators=[
            MinValueValidator(1, 'Apartment number can\'t be negative'),
            MaxValueValidator(99, 'Apartment number can\'t be more than 99')
        ]
    )