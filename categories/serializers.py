from rest_framework import serializers
from .models import Category

from django.apps import apps
Talk =  apps.get_model('talks', 'Talk')

class CategoryTalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talk
        fields = ('name',)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
      


class PopulatedCategorySerializer(CategorySerializer):
        talk = CategoryTalkSerializer(many=True)
    # if many=True and there is only one in the category it will create an error - object Talk is not iterable. be aware
