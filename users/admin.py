from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email','is_active','is_driver','pk',"hes_code"]
    fieldsets = (
        (('User'), {'fields': ('is_driver','username', 'email', 'first_name', 'last_name','longitude','latitude','balance','hes_code_value','hes_code')}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
