from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField

User = get_user_model()


class Talk(models.Model):
    name = models.CharField(max_length=40, unique=True)
    date_time = models.DateTimeField()
    # time = models.
    location = models.CharField(max_length=300)
    about = models.CharField(max_length=1000)
    image = ArrayField(models.CharField(max_length=500))
    host = models.ForeignKey(
        User,
        related_name='talks',
        on_delete=models.CASCADE
    )
    # genres = models.ManyToManyField(
    #     'genres.Genre',
    #     related_name='songs'
    # )

    def __str__(self):
        return f'{self.name} hosted at {self.location}'
