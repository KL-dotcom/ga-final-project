from rest_framework import serializers
from .models import Category


from talks.serializers import PopulatedTalkSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
      


class PopulatedCategorySerializer(CategorySerializer):
        talks = PopulatedTalkSerializer(many=True)
    # if many=True and there is only one in the category it will create an error - object Talk is not iterable. be aware
