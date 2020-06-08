# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Category
from .serializers import CategorySerializer, PopulatedCategorySerializer
from jwt_auth.serializers import UserSerializer
from django.contrib.auth import get_user_model


class CategoryListView(APIView):

    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = PopulatedCategorySerializer(
            categories, many=True)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)


class CategoryDetailView(APIView):

    def get_category(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        categories = self.get_category(pk)
        serialized_categories = PopulatedCategorySerializer(categories)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)

