from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser,Shuttle,Trip,CarPooling
from django import forms
from allauth.socialaccount.models import SocialToken, SocialAccount, SocialApp,EmailAddress

admin.site.unregister(SocialToken)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialApp)
admin.site.unregister(EmailAddress)

class ShuttleForm(forms.ModelForm):
    class Meta:
        model = Shuttle
        fields = "__all__"

class CarPoolingForm(forms.ModelForm):
    class Meta:
        model = CarPooling
        fields = "__all__"

class TripForm(forms.ModelForm):
    class Meta:
        model = Trip
        fields = "__all__"

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email','is_active','is_driver','pk',"hes_code","car_type"]
    fieldsets = (
        (('User'), {'fields': ('is_driver','username', 'email', 'first_name', 'last_name','longitude','latitude','balance','hes_code_value','hes_code','car_type')}),
    )

class ShuttleAdmin(admin.ModelAdmin):
    form = ShuttleForm
    fields = ["startLong","endLong","startLat","endLat","shuttle_name","price","start_time","remaining_capacity","shuttle_plate"]
    model = Shuttle
    list_display = ["startLong","endLong","startLat","endLat","shuttle_name","price","start_time","remaining_capacity","shuttle_plate"]
    
class TripAdmin(admin.ModelAdmin):
    fields = ["startLong","endLong","startLat","endLat","driverId","travellerId","givenStar","price","status"]
    model = Trip
    list_display = ["startLong","endLong","startLat","endLat","driverId","travellerId","givenStar","price","status"]

class CarPoolingAdmin(admin.ModelAdmin):
    fields = ["groupName","wplink","ppp","start_time","member_id","creator_id"]
    model = CarPooling
    list_display = ["groupName","wplink","ppp","start_time","member_id","creator_id"]


admin.site.register(CustomUser, CustomUserAdmin )
admin.site.register(Shuttle,ShuttleAdmin)
admin.site.register(Trip,TripAdmin)
admin.site.register(CarPooling,CarPoolingAdmin)
