# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Talk
from .serializers import TalkSerializer, PopulatedTalkSerializer
from jwt_auth.serializers import UserSerializer
from django.contrib.auth import get_user_model
from polls.models import Poll


class TalkListView(APIView):

    def get(self, _request):

        talks = Talk.objects.all()

        serialized_talks = PopulatedTalkSerializer(talks, many=True)
        return Response(serialized_talks.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['host'] = request.user.id
        new_talk = TalkSerializer(data=request.data)
        if new_talk.is_valid():
            new_talk.save()
            return Response(new_talk.data, status=status.HTTP_201_CREATED)
        return Response(new_talk.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TalkDetailView(APIView):

    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def get_talk(self, pk):
        try:
            return Talk.objects.get(pk=pk)
        except Talk.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):

        talk = self.get_talk(pk)
        serialized_talk = PopulatedTalkSerializer(talk)
        return Response(serialized_talk.data, status=status.HTTP_200_OK)

    def is_talk_host(self, talk, user):
        if talk.host.id != user.id:
            raise PermissionDenied()

    def put(self, request, pk):
        talk_to_update = self.get_talk(pk)
        self.is_talk_host(talk_to_update, request.user)
        request.data['host'] = request.user.id
        updated_talk = TalkSerializer(
            talk_to_update, data=request.data, partial=True)
        if updated_talk.is_valid():
            updated_talk.save()
            return Response(updated_talk.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_talk.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        talk_to_delete = self.get_talk(pk)
        self.is_talk_host(talk_to_delete, request.user)
        talk_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
