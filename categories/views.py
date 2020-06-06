# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from .models import Category
from .serializers import CategorySerializer
from jwt_auth.serializers import UserSerializer


class CategoryListView(APIView):

    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = CategorySerializer(categories, many=True)
        return Response(serialized_categories.data, status=HTTP_200_OK)


class PopulatedGenreSerializer(CategorySerializer):
    users = UserSerializer(many=True)
