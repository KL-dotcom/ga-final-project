from django.db import models
from django.contrib.auth import get_user_model
from talks.models import Talk

User = get_user_model()

class Category(models.Model):
    category = models.CharField(max_length=50)
    
    talk = models.ForeignKey(
        Talk,
        related_name='categories',
        on_delete=models.CASCADE
    )
    
    def __str__(self):
      return f'{self.category}'