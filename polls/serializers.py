from rest_framework import serializers

from .models import Poll
from talks.models import Talk

class PollSerializer(serializers.ModelSerializer):
  class Meta:
    model = Poll
    fields = '__all__'


class TalkSerializer(serializers.ModelSerializer):
  class Meta:
    model = Talk
    fields = ('name')


class PopulatedPollSerializer(PollSerializer):
  talk = TalkSerializer()