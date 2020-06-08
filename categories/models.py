from django.db import models
from django.contrib.auth import get_user_model
from talks.models import Talk

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=50)


    def __str__(self):
        return f'{self.name}'
