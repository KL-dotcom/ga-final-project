# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied

from .serializers import VoteSerializer, PopulatedVoteSerializer
from .models import Votes


class VotesListView(APIView):

    def get(self, _request):
        votes = Votes.objects.all()
        serialized_votes = PopulatedVoteSerializer(votes, many=True)
        return Response(serialized_votes.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['user'] = request.user.id
        new_vote = VoteSerializer(data=request.data)
        if new_vote.is_valid():
            new_vote.save()
            return Response(new_vote.data, status=status.HTTP_201_CREATED)
        return Response(new_vote.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
