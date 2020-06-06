from django.db import models
from django.contrib.auth import get_user_model
from talks.models import Talk


User = get_user_model()


class UserImage(models.Model):
    image = models.CharField(max_length=500)

    user = models.ForeignKey(
        User,
        related_name='images',
        blank=True,
        on_delete=models.CASCADE
    )
    
    def __str__(self):
      return f'{self.user}\'s profile image'



class TalkImage(models.Model):
    image = models.CharField(max_length=500)

    talk = models.ForeignKey(
          'talks.Talk',
          related_name='images',
          blank=True,
          on_delete=models.CASCADE
      )
    
    def __str__(self):
      return f'{self.talk}\'s talk image'