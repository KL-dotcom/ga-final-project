from django.db import models
from django.contrib.postgres.fields import ArrayField
from talks.models import Talk


class Poll(models.Model):
    question = models.CharField(max_length=300)
    option_a = models.CharField(max_length=300)
    option_b = models.CharField(max_length=300)
    option_c = models.CharField(max_length=300, blank=True)
    option_d = models.CharField(max_length=300, blank=True)

    talk = models.ForeignKey(
        'talks.Talk',
        related_name='polls',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.question}'
