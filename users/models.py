from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class CustomUser(AbstractUser):
    is_driver = models.BooleanField(default=False)
    star = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    latitude = models.FloatField(default=40.0550272)
    longitude = models.FloatField(default=29.0848768)

    def __str__(self):
        return self.email
