from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, ListModelMixin
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from .models import CarPooling, CustomUser, Trip
from datetime import datetime
from .serializers import CreateCarPoolGroupSerializer, CreateTripSerializer, UpdateUserBudget, UpdateUserLocation, UserSerializer, UserDetailsSerializer, UserSettingSerializer

# custom permission class


class IsOwnOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request in permissions.SAFE_METHODS:
            return True
        return request.user.pk == obj.pk


class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser]


class UserViewSet(ListAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().filter(is_driver=True)
    serializer_class = UserDetailsSerializer
    # permission_classes = [IsAuthenticated]

class CustomUserDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UpdateUserLocation
    permission_classes = [IsOwnOrReadOnly]  # custom permission class

class UserBudgetAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UpdateUserBudget


class CustomUserSettingsAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSettingSerializer
    permission_classes = [IsOwnOrReadOnly]  # custom permission class


# trip

class TripViewSet(ListModelMixin, CreateModelMixin, GenericAPIView, DestroyModelMixin,):
    """
    Trip viewset
    """
    queryset = Trip.objects.all()
    serializer_class = CreateTripSerializer
    # listelemek

    def get(self, request, *args, **kwargs):
        print("request")
        print(request)
        return self.list(request, *args, **kwargs)

    # yaratmak istiyorum
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

      

class TripDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = CreateTripSerializer


class TravellerTripsAPIView(ListAPIView):
    serializer_class = CreateTripSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        print(self.kwargs['travellerId'])
        print(Trip.objects.all().filter(travellerId_id = 2))
        return Trip.objects.all().filter(travellerId_id = self.kwargs['travellerId'])

class DriverTripsAPIView(ListAPIView):
    serializer_class = CreateTripSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        print(self.kwargs['driverId'])
        print(Trip.objects.all().filter(driverId = 2))
        return Trip.objects.all().filter(driverId_id = self.kwargs['driverId'])

# CARPOOLING GROUP VIEWS 

class CarPoolingGroups(ListModelMixin, CreateModelMixin, GenericAPIView, DestroyModelMixin):
    queryset = CarPooling.objects.all()
    serializer_class = CreateCarPoolGroupSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    # yaratmak istiyorum
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



