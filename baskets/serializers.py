from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Basket

from talks.serializers import BasketTalkSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = '__all__'


class PopulatedBasketSerializer(BasketSerializer):
    user = UserSerializer()
    talk = BasketTalkSerializer()
