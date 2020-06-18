from rest_framework import serializers
from django.contrib.auth import get_user_model

# from talks.serializers import TalkSerializer
from .models import UserImage
from .models import TalkImage
User = get_user_model()

# --------------- user image serializers: ---------------


class ImageSerializerUser(serializers.ModelSerializer):

    class Meta:
        model = UserImage
        fields = '__all__'


class ImageSerializerTalk(serializers.ModelSerializer):

    class Meta:
        model = TalkImage
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = '__all__'


# class PopulatedUserImageSerializer(UserImageSerializer):
#   class Meta:
#     user = UserSerializer()


# ----------------------- talk image serializers: -------

class TalkImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TalkImage
        fields = '__all__'


class PopulatedTalkImageSerializer(TalkImageSerializer):
    talk = TalkImageSerializer()
