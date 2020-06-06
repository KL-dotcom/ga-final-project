from django.db import models
from django.contrib.auth import get_user_model
from talks.models import Talk


User = get_user_model()


class Category(models.Model):
    label = models.CharField(max_length=50)

    talk = models.ManyToManyField(
        'talks.Talk',
        related_name='categories',
        blank=True
    )
    user = models.ManyToManyField(
        User,
        related_name='categories',
        blank=True
    )

    def __str__(self):
      return f'{self.label}'