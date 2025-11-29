from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Profile

from .permissions import IsOwner

from .serializers import ProfileSerializer

class ProfileViewset(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Profile.objects.filter(self.request.user)