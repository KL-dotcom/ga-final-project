from rest_framework import serializers

from .models import Poll
from talks.models import Talk
from votes.models import Votes


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = '__all__'


# class TalkSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Talk
#         fields = ('name', 'id', 'host')


class VotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Votes
        fields = '__all__'


class PopulatedPollSerializer(PollSerializer):

    results = VotesSerializer(many=True)
