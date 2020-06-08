from django.db import models
from django.contrib.auth import get_user_model
from talks.models import Talk

User = get_user_model()


class Ticket(models.Model):
    image = models.CharField(max_length=100)
    # this is for the qr code
    
    user = models.ForeignKey(
        User,
        related_name='users_tickets',
        on_delete=models.CASCADE
    )
    
    talk = models.OneToOneField(
        Talk,
        related_name='talks_tickets',
        on_delete=models.CASCADE
    )


    def __str__(self):
        return f'{self.user} has a ticket to {self.talk}'
