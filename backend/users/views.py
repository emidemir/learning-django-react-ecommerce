# DRF packages
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# SimpleJWT package
from rest_framework_simplejwt.tokens import RefreshToken

# Django packages
from django.contrib.auth import get_user_model, authenticate

# Model data
from .models import CustomUser

# Python packages
import requests

User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    """Traditional signup via signup form"""
    # 1) Get data from the request
    fullname = request.data.get('fullName')
    email = request.data.get('email')
    password = request.data.get('password')

    # 2) Check the data availability, credibility
    if (not email or not password):
        return Response({
            'message': 'Email and password are required!',
        }, status=status.HTTP_400_BAD_REQUEST)

    # 3) Check if the user already exists
    if CustomUser.objects.filter(email=email).exists():
        return Response({
            'message':'Invalid creditentials. Try again!',
        },status=status.HTTP_400_BAD_REQUEST)

    try:

        # 4) Create user
        newUser = CustomUser.objects.create_user(
            username = fullname,
            email = email,
            password=password
        )

        # 5) Generate JWT token
        token = RefreshToken.for_user(newUser)
        return Response({
            'message': 'User created succesfully!',
            'access': str(token.access_token),
            'refresh': str(token),
            'user':{
                'id': newUser.id,
                'username': newUser.username,
                'email': newUser.email,
            }
        },status=status.HTTP_201_CREATED)
    except Exception as E:
        return Response({
            'message': str(E)
        },status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def signin(request):
    """Traditional signin via signin form"""
    # 1) Get data from the request
    email = request.data.get("email")
    password = request.data.get("password")

    # 2) Check data availability
    if (not email and not password):
        return Response({
            'message':'Email and password are required.',
        },status=status.HTTP_400_BAD_REQUEST)
    
    # 3) Get username for authenticating the user
    try:
        user = CustomUser.objects.get(email = email)
        username = user.username
    except CustomUser.DoesNotExist:
        return Response({
            'message': 'No user found!',
        },status=status.HTTP_400_BAD_REQUEST)
        
    user = authenticate(username = username, password = password)

    if not user:
        return Response({
            'message':'Creditentials are wrong!',
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # 4) Return the token and responde
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Logout by blacklisting the Refresh token. Keep access token short-lived for max security"""
    try:
        token = RefreshToken(request.data.get('refresh'))
        if token:
            token.blacklist()
            return Response({
                'message':'Succesfully logged out!',
            },status=status.HTTP_200_OK)
        return Response({
            'message':'Refresh token is required!'
        },status=status.HTTP_400_BAD_REQUEST)
    except Exception as E:
        return Response({
            'message': 'Invalid token'
        },status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def google_oauth(request):
    """Google OAuth signin&signup, both handled in the same view"""
    
    # 1) Get google access token (provided by the google api on frontend)
    google_access_token = request.data.get('access_token')

    if not google_access_token:
        return Response({
            'message':'Google access token is required',
        },status=status.HTTP_400_BAD_REQUEST)
    try:
        # https://stackoverflow.com/a/24646356/17799171
        # https://developers.google.com/identity/sign-in/android/backend-auth
        verification_url = f"https://oauth2.googleapis.com/tokeninfo?id_token={google_access_token}"
        google_response = requests.get(verification_url)

        if google_response.status_code != 200:
            return Response({
                'message': 'Bad creditentials!',
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user_info = google_response.json()
        if not user_info.get('email_verified'):
            return Response({
                'message': 'Email is not verified by Google!',
            }, status=status.HTTP_400_BAD_REQUEST)
        
        email = user_info.get('email')
        firstName = user_info.get('name')
        lastName = user_info.get('family_name')
        
        if not email:
            return Response({
                'message': "Something bad happened while trying to access the email from google response!",
            },status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(email=email)
            created = False
        except CustomUser.DoesNotExist:
            user = CustomUser.objects.create_user(
                email=email,
                username=f"{firstName} {lastName}",
                last_name=lastName
            )

        refresh = RefreshToken.for_user(user=user)
        return Response({
            'access': refresh.access_token,
            'refresh': refresh,
            'user': {
                'id': user.id,
                'userName': user.username,
                'email': user.email,
            },
        }, status=status.HTTP_200_OK)
    
    except requests.exceptions.RequestException as E:
        return Response({
            'message': f'Failed to verify token with Google! {str(E)}'
        },status=status.HTTP_400_BAD_REQUEST)
