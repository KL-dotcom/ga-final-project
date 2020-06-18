from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from talks.models import Talk


User = get_user_model()


class Basket(models.Model):
    total_price = models.DecimalField(
        max_digits=6, decimal_places=2, default=0)
    summary = models.CharField(max_length=200, blank=True)
    # this is for the qr code
    user = models.ForeignKey(
        User,
        related_name='users_basket',
        on_delete=models.CASCADE
    )
    talk = models.ManyToManyField(
        'talks.Talk',
        related_name='basket',
        # on_delete=models.CASCADE
        blank=True
    )

    def __str__(self):
        return f'{self.user} going to {self.talk}'
