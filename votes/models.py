from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from polls.models import Poll

User = get_user_model()


class Votes(models.Model):
    response = models.CharField(max_length=300)

    polls = models.ForeignKey(
        Poll,
        related_name='results',
        on_delete=models.CASCADE

    )

    user = models.ForeignKey(
        User,
        related_name='vote',
        on_delete=models.CASCADE
    )
