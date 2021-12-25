from datetime import datetime
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import CustomUser, Trip
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

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.is_driver = self.data.get('is_driver')
        user.save()
        return user


class UserDetailsSerializer(ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = CustomUser
        fields = ('pk', 'is_driver','username', 'email', 'first_name', 'last_name','longitude','latitude','balance')
        
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

class CreateTripSerializer(ModelSerializer):
    """
    Trip creation 
    """
    class Meta:
        model = Trip
        fields = '__all__'