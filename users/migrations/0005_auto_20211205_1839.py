# Generated by Django 3.1.2 on 2021-12-05 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20211205_1839'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='latitude',
            field=models.FloatField(default=1230.1241241),
        ),
    ]
