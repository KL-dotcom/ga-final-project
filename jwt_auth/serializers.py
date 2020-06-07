# pylint: disable=arguments-differ, no-self-use, no-member
from rest_framework import serializers
from django.contrib.auth import get_user_model
# import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.apps import apps

# from categories.serializers import CategorySerializer
# from categories.models import Category
Category = apps.get_model('categories', 'Category')

User = get_user_model()


class CategoryUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category',)

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
# this is where the other seializers go

    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'does not match'})
        # try:
        #     validations.validate_password(password=password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password': err.messages})
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'


class PopulatedUserSerializer(UserSerializer):
    categories = CategoryUserSerializer(many=True)

    def update(self, instance, validated_data):
        category_label = [cdata['label']
                          for cdata in validated_data['categories']]
        validated_data.pop('categories', None)
        categories = Category.objects.filter(label__in=category_label)
        super().update(instance, validated_data)
        instance.categories.set(categories)
        return instance
