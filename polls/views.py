# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Poll
from .serializers import PollSerializer, PopulatedPollSerializer

# everything will fall under the details view, plus need to check that all actions can only take place for the host of the talk


class PollListView(APIView):
    def get(self, _request):
        polls = Poll.objects.all()
        serialized_polls = PopulatedPollSerializer(polls, many=True)
        return Response(serialized_polls.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_poll = PollSerializer(data=request.data)
        if new_poll.is_valid():
            new_poll.save()
            return Response(new_poll.data, status=status.HTTP_201_CREATED)
        return Response(new_poll.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class PollDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_poll(self, pk):
        try:
            return Poll.objects.get(pk=pk)
        except Poll.DoesNotExist:
            raise NotFound()

    def is_poll_owner(self, poll, user):
        if poll.talk.host.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        poll = self.get_poll(pk)
        serialized_poll = PopulatedPollSerializer(poll)
        return Response(serialized_poll.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        poll_to_update = self.get_poll(pk)
        # self.is_poll_owner(poll_to_update, request.user)
        updated_poll = PollSerializer(
            poll_to_update, data=request.data, partial=True)
        if updated_poll.is_valid():
            updated_poll.save()
            return Response(updated_poll.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_poll.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        poll_to_delete = self.get_poll(pk)
        self.is_poll_owner(poll_to_delete, request.user)
        poll_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
