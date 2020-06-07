from rest_framework import serializers
from talks.serializers import CategoryTalkSerializer
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
      


class PopulatedCategorySerializer(CategorySerializer):
    talk = CategoryTalkSerializer()
    # if many=True and there is only one in the category it will create an error - object Talk is not iterable. be aware
