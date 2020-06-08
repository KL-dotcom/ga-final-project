# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from .models import Basket
from .serializers import PopulatedBasketSerializer, BasketSerializer


# this shows all baskets, but we only want to retireve vakster connected to the user. detail view. just had this one for testing purposes.
# class BasketListView(APIView):
#     permission_classes = (IsAuthenticatedOrReadOnly,)

#     def get(self, _request):
#         baskets = Basket.objects.all()
#         serialized_baskets = BasketSerializer(baskets, many=True)
#         return Response(serialized_baskets.data, status=status.HTTP_200_OK)


# populatedbasketserializer populates user field but leave the fiend 'name' null on talk
class BasketDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_basket(self, pk):
        try:

            return Basket.objects.get(pk=pk)
        except Basket.DoesNotExist:
            raise NotFound()

    def is_basket_user(self, basket, user):
        if basket.user.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        basket = self.get_basket(pk)
        serialized_basket = PopulatedBasketSerializer(basket)
        return Response(serialized_basket.data, status=status.HTTP_200_OK)
