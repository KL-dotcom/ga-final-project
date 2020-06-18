# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from .models import Basket
from .serializers import PopulatedBasketSerializer, BasketSerializer


# this shows all baskets, but we only want to retireve vakster connected to the user. detail view. just had this one for testing purposes.
class BasketListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        baskets = Basket.objects.all()
        serialized_baskets = BasketSerializer(baskets, many=True)
        return Response(serialized_baskets.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['user'] = request.user.id
        new_basket = BasketSerializer(data=request.data)
        if new_basket.is_valid():
            new_basket.save()
            return Response(new_basket.data, status=status.HTTP_201_CREATED)
        return Response(new_basket.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


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

    def get(self, request, pk):
        basket = self.get_basket(pk)
        self.is_basket_user(basket, request.user)
        serialized_basket = PopulatedBasketSerializer(basket)
        return Response(serialized_basket.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        basket_to_update = self.get_basket(pk)
        self.is_basket_user(basket_to_update, request.user)
        updated_basket = BasketSerializer(
            basket_to_update, data=request.data, partial=True)
        if updated_basket.is_valid():
            updated_basket.save()
            return Response(updated_basket.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_basket.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        basket_to_delete = self.get_basket(pk)
        self.is_basket_user(basket_to_delete, request.user)
        basket_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BasketUserView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        basket = Basket.objects.get(user_id=request.user.id)
        serialized_baskets = BasketSerializer(basket)
        return Response(serialized_baskets.data, status=status.HTTP_200_OK)
