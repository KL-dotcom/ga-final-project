from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField

User = get_user_model()


class Talk(models.Model):
    name = models.CharField(max_length=40, unique=True)
    date_time = models.DateTimeField()
    category = models.ManyToManyField(
      'categories.Category',
      related_name='Talk',
      blank=True
    )
    location = models.CharField(max_length=300)
    about = models.CharField(max_length=1000)
    image = models.ManyToManyField(
      'images.TalkImage',
      related_name='Talk',
      blank=True
    )
    price = models.DecimalField(max_digits=6, decimal_places=2)
    host = models.ForeignKey(
        User,
        related_name='talks',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.name} hosted at {self.location}'
