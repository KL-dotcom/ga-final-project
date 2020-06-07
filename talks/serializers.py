from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.apps import apps

from polls.serializers import PollSerializer
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


class BasketTalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talk
        fields = ('name', )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PopulatedTalkSerializer(TalkSerializer):
    host = UserSerializer()
    categories = CategorySerializer(many=True)
    polls = PollSerializer(many=True)

    def update(self, instance, validated_data):
        category_label = [cdata['label']
                          for cdata in validated_data['categories']]
        validated_data.pop('categories', None)
        categories = Category.objects.filter(label__in=category_label)
        super().update(instance, validated_data)
        instance.categories.set(categories)
        return instance
