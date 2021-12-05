from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from .models import CustomUser

from .serializers import   UpdateUserLocation, UserSerializer ,UserDetailsSerializer, UserSettingSerializer

#custom permission class 
class IsOwnOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request in permissions.SAFE_METHODS:
            return True
        return request.user.pk == obj.pk

class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [IsAdminUser]

class UserViewSet(ListAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().filter(is_driver=True)
    serializer_class = UserDetailsSerializer
    #permission_classes = [IsAuthenticated]

class CustomUserDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UpdateUserLocation
    permission_classes = [IsOwnOrReadOnly] # custom permission class

class CustomUserSettingsAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSettingSerializer
    permission_classes = [IsOwnOrReadOnly] # custom permission class


