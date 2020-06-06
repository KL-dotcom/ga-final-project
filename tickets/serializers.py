from rest_framework import serializers
from django.contrib.auth import get_user_model

from talks.serializers import TalkSerializer
from .models import Ticket


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = User
        fields = ('id', 'username')

class TicketSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Ticket
    fields = '__all__'

class PopulatedTicketSerializer(TicketSerializer):
  owner = UserSerializer()
  talk = TalkSerializer()