
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.apps import apps

from polls.serializers import PollSerializer
from images.serializers import ImageSerializerTalk
from comments.serializers import CommentSerializer
from tickets.serializers import TicketSerializer

from .models import Talk
Poll = apps.get_model('polls', 'Poll')
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
    polls = PollSerializer(many=True)
    talk_images = ImageSerializerTalk(many=True)
    comments = CommentSerializer(many=True)
    ticket = TicketSerializer(many=True)

    # def update(self, instance, validated_data):
    #     # category_label = [cdata['label']
    #     #                   for cdata in validated_data['categories']]
    #     # validated_data.pop('categories', None)
    #     # categories = Category.objects.filter(label__in=category_label)
    #     #     super().update(instance, validated_data)
    #     #     instance.categories.set(categories)
    #     #     return instance
    #     category_category = [cdata['category']
    #                          for cdata in validated_data['categories']]
    #     categories = Category.objects.filter(category__in=category_category)
    #     validated_data.pop('categories', None)

    #     # poll_id = [cdata['talk'] for cdata in validated_data['polls']]
    #     # polls = Poll.objects.filter(id__in=poll_id)

    #     validated_data.pop('polls', None)
    #     super().update(instance, validated_data)
    #     instance.categories.set(categories)
    #     # instance.polls.set(polls)

    #     return instance
