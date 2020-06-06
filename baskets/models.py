from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from talks.models import Talk


User = get_user_model()


class Basket(models.Model):
    total_price = models.DecimalField(max_digits=6, decimal_places=2)
    summary = models.CharField(max_length=200)
    # this is for the qr code
    user = models.ForeignKey(
        User,
        related_name='baskets',
        on_delete=models.CASCADE
    )

    # talk = ArrayField(
    #     ArrayField(
    #         models.ForeignKey(
    #             Talk,
    #             related_name='baskets',
    #             on_delete=models.CASCADE
    #         ), size=3
    #     ),
    #     size=3
    # )

    talk = models.ManyToManyField(
        'talks.Talk',
        related_name='baskets'
    )


    def __str__(self):
        return f'{self.user} - {self.total_price}'
