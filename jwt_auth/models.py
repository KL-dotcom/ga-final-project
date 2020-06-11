from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    profile_image = models.CharField(max_length=500, blank=True)
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=30, unique=True)
    gender = models.CharField(max_length=15, blank=True)
    age = models.IntegerField(blank=True, null=True)
    ethnicity = models.CharField(max_length=50, blank=True)
    industry = models.CharField(max_length=50, blank=True)
    interests = models.ManyToManyField(
      'categories.Category',
      related_name='users',
      blank=True
    )
    
    def __str__(self):
      return f'{self.username}'
