from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.apps import apps

from .models import Talk
Category = apps.get_model('categories', 'Category')

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class TalkSerializer(serializers.ModelSerializer):
  class Meta:
    model = Talk
    fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'



class PopulatedTalkSerializer(TalkSerializer):
  host = UserSerializer()
  categories = CategorySerializer(many=True)