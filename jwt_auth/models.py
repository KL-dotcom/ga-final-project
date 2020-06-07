from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=30, unique=True)
    user_image = models.ManyToManyField(
      'images.UserImage',
      related_name='User',
      blank=True
    )
    gender = models.CharField(max_length=15, blank=True)
    age = models.IntegerField(blank=True, null=True)
    ethinicity = models.CharField(max_length=50, blank=True)
    industry = models.CharField(max_length=50, blank=True)
    categories = models.ManyToManyField(
      'categories.Category',
      related_name='User',
      blank=True
    )
    
    def __str__(self):
      return f'{self.username}'
