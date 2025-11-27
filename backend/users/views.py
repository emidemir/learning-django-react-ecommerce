# DRF packages
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

# Django packages
from django.contrib.auth import get_user_model

# Python packages
import requests
import json

User = get_user_model()

@api_view(["POST"])
@permission_classes(['AllowAny'])
def signup(request):
    pass

@api_view(["POST"])
@permission_classes(["AllowAny"])
def signin(request):
    pass

@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def logout(request):
    pass

@api_view(["POST"])
@permission_classes([AllowAny])
def google_oauth(request):
    pass