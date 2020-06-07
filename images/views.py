# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import TalkImage, UserImage
from .serializers import PopulatedTalkImageSerializer, UserImageSerializer

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