# pylint: disable=arguments-differ, no-self-use, no-member
from rest_framework import serializers
from django.contrib.auth import get_user_model
# import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError


from categories.serializers import CategorySerializer
from images.serializers import ImageSerializerUser
from baskets.serializers import BasketSerializer
from tickets.serializers import TicketSerializer, PopulatedTicketSerializer

User = get_user_model()


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


class updateUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('first_name', 'last_name', 'email', 'username', 'gender', 'age', 'ethnicity', 'industry', 'interests')


class PopulatedUserSerializer(UserSerializer):
    # interests = CategorySerializer(many=True)
    profile_images = ImageSerializerUser(many=True)
    users_basket = BasketSerializer(many=True)
    ticket = PopulatedTicketSerializer(many=True)

    # def update(self, instance, validated_data):
    #     category_label = [cdata['label']
    #                       for cdata in validated_data['categories']]
    #     validated_data.pop('categories', None)
    #     categories = Category.objects.filter(label__in=category_label)
    #     super().update(instance, validated_data)
    #     instance.categories.set(categories)
    #     return instance

    # def update(self, instance, validated_data):
    # category_label = [cdata['label']
    #                   for cdata in validated_data['categories']]
    # validated_data.pop('categories', None)
    # categories = Category.objects.filter(label__in=category_label)
    # super().update(instance, validated_data)
    # instance.categories.set(categories)
    # return instance

    # category_category = [cdata['category']
    #                      for cdata in validated_data['categories']]
    # validated_data.pop('categories', None)
    # categories = Category.objects.filter(category__in=category_category)
    # super().update(instance, validated_data)
    # instance.categories.set(categories)
    # return instance
