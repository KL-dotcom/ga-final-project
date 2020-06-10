from rest_framework import serializers
from .models import Votes


from talks.serializers import PopulatedTalkSerializer
from jwt_auth.serializers import updateUserSerializer


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Votes
        fields = '__all__'


class PopulatedVoteSerializer(VoteSerializer):
    user = updateUserSerializer()
