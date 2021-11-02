from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer ,UserDetailsSerializer



class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [IsAdminUser]

