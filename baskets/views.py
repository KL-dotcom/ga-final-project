# pylint: disable=no-member, no-self-use
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import BasketSerializer, PopulatedBasketSerializer
from .models import Basket
from rest_framework import status


class BasketListView(APIView):
    def get(self, _request):
        baskets = Basket.objects.all()
        serialized_baskets = PopulatedBasketSerializer(baskets, many=True)
        return Response(serialized_baskets.data, status=status.HTTP_200_OK)
