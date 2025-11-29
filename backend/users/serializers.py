# DRF packages
from rest_framework import serializers

# Django packages

# Project packages
from .models import CustomUser, Profile, Address

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model: Address
        fields = '__all__'
