from django.db import models
from django.contrib.auth import get_user_model
from talks.models import Talk


User = get_user_model()


class Image(models.Model):
    image = models.CharField(max_length=200)

    talk = models.ManyToManyField(
        'talks.Talk',
        related_name='images',
        blank=True
    )
    user = models.ManyToManyField(
        User,
        related_name='images',
        blank=True
    )
