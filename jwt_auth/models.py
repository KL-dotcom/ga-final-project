from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=30, unique=True)
    profile_pic = models.CharField(max_length=500, blank=True)
    gender = models.CharField(max_length=15, blank=True)
    age = models.IntegerField(blank=True)
    ethinicity = models.CharField(max_length=50, blank=True)
    industry = models.CharField(max_length=50, blank=True)
    # interests = connected to categories
    
    def __str__(self):
      return f'{self.username}'
