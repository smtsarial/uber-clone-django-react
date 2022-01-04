from datetime import datetime
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import CarPooling, CustomUser, Trip
from django.db import transaction
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from datetime import datetime

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['pk','email','last_login', 'date_joined', 'is_staff','is_driver','balance']

class UserSettingSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['pk','email','is_driver', 'is_driver','username','first_name','last_name','balance']

class CustomRegisterSerializer(RegisterSerializer):
    is_driver = serializers.BooleanField()
    hes_code_value = serializers.CharField(max_length=12)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.is_driver = self.data.get('is_driver')
        user.hes_code_value = self.data.get('hes_code_value')
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name')
        user.save()
        return user


class UserDetailsSerializer(ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = CustomUser
        fields = ('pk', 'is_driver','username', 'email', 'first_name', 'last_name','longitude','latitude','balance','hes_code','star')
        
class UpdateUserLocation(ModelSerializer):
    """
    User location serializer
    """
    class Meta:
        model = CustomUser
        fields = ('pk','longitude','latitude')

class UpdateUserBudget(ModelSerializer):
    """
    User location serializer
    """
    class Meta:
        model = CustomUser
        fields = ('pk','balance')

class UpdateUserStar(ModelSerializer):
    """
    User star serializer
    """
    class Meta:
        model = CustomUser
        fields = ('pk','star')


class UpdateUserCarGroup(ModelSerializer):
    """
    User carpool group serializer
    """
    class Meta:
        model = CustomUser
        fields = ('pk','registeredCarGroup')

class CreateTripSerializer(ModelSerializer):
    """
    Trip creation 
    """
    class Meta:
        model = Trip
        fields = '__all__'


# CAR POOLING OPERATIONS 
class CreateCarPoolGroupSerializer(ModelSerializer):
    """
    Trip creation 
    """
    class Meta:
        model = CarPooling
        fields = '__all__'