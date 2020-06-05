from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from talks.models import Talk


User = get_user_model()


class Comment(models.Model):
    text = models.CharField(max_length=300)

    user = models.ForeignKey(
        User,
        related_name='comments',
        on_delete=models.CASCADE
    )

    talk = models.ForeignKey(
        'talks.Talk',
        related_name='comments',
        on_delete=models.CASCADE
    )


# def __str__(self):
#     return f'{self.image}'
