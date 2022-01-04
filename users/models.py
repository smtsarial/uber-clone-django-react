from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

HES_CHOICES = (
    ('ACCEPTED','ACCEPTED'),
    ('PENDING', 'PENDING'),
    ('RISK','RISK'),
)


class CustomUser(AbstractUser):
    is_driver = models.BooleanField(default=False)
    star = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    latitude = models.FloatField(default=40.0550272)
    longitude = models.FloatField(default=29.0848768)
    balance = models.FloatField(default=9999.0)
    registeredCarGroup = models.IntegerField(default=0)
    hes_code = models.CharField(max_length=12,default="PENDING",choices=HES_CHOICES)
    hes_code_value = models.CharField(max_length=12,default="")
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

class CarPooling(models.Model):
    groupName=  models.CharField(max_length=255)
    wplink =  models.CharField(max_length=255)
    ppp = models.FloatField(default=0)
    start_time =  models.CharField(max_length=5, default="00:00")
    member_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="traveller1")
    creator_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="creator")
    def __str__(self):
        return str(self.groupName)