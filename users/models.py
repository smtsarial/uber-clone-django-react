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
    balance = models.FloatField(default=9999.0)

    def __str__(self):
        return self.email


class Trip(models.Model):
    startLong= models.FloatField(default=40.0550272)
    endLong= models.FloatField(default=40.0550272)
    startLat= models.FloatField(default=40.0550272)
    endLat= models.FloatField(default=40.0550272)
    driverId= models.ForeignKey(CustomUser, on_delete=models.CASCADE , related_name='driver')
    travellerId= models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='traveller')
    givenStar=models.PositiveIntegerField(validators = [MinValueValidator(1), MaxValueValidator(5)],)
    price = models.FloatField(default=0.0)
    status=  models.CharField(max_length=255)
    
    def __str__(self):
        return str(self.status)
