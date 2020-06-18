# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import TalkImage, UserImage
from .serializers import PopulatedTalkImageSerializer, UserImageSerializer, ImageSerializerUser, ImageSerializerTalk


class ImageListViewUser(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        images = UserImage.objects.all()
        serialized_images = ImageSerializerUser(images, many=True)
        return Response(serialized_images.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['user'] = request.user.id
        new_image = ImageSerializerUser(data=request.data)
        if new_image.is_valid():
            new_image.save()
            return Response(new_image.data, status=status.HTTP_201_CREATED)
        return Response(new_image.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ImageListViewTalk(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        images = TalkImage.objects.all()
        serialized_images = ImageSerializerTalk(images, many=True)
        return Response(serialized_images.data, status=status.HTTP_200_OK)

    def post(self, request):

        new_image = ImageSerializerTalk(data=request.data)
        if new_image.is_valid():
            new_image.save()
            return Response(new_image.data, status=status.HTTP_201_CREATED)
        return Response(new_image.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class UserImageDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_user_image(self, pk):
        try:
            return UserImage.objects.get(pk=pk)
        except UserImage.DoesNotExist:
            raise NotFound()

    def is_image_users(self, UserImage, user):
        if UserImage.user.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        UserImage = self.get_user_image(pk)
        serialized_user_image = UserImageSerializer(UserImage)
        return Response(serialized_user_image.data, status=status.HTTP_200_OK)


class TalkImageDetailView(APIView):

    def get_talk_image(self, pk):
        try:
            return TalkImage.objects.get(pk=pk)
        except TalkImage.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        TalkImage = self.get_talk_image(pk)
        serialized_talk_image = PopulatedTalkImageSerializer(TalkImage)
        return Response(serialized_talk_image.data,)
