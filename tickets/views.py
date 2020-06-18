# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Ticket
from .serializers import PopulatedTicketSerializer, TicketSerializer


class TicketListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        tickets = Ticket.objects.all()
        serialized_tickets = PopulatedTicketSerializer(tickets, many=True)
        return Response(serialized_tickets.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['user'] = request.user.id
        new_ticket = TicketSerializer(data=request.data)
        if new_ticket.is_valid():
            new_ticket.save()
            return Response(new_ticket.data, status=status.HTTP_201_CREATED)
        return Response(new_ticket.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TicketDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_ticket(self, pk):
        try:

            return Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            raise NotFound()

    def is_ticket_user(self, ticket, user):
        if ticket.user.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        ticket = self.get_ticket(pk)
        serialized_ticket = PopulatedTicketSerializer(ticket)
        return Response(serialized_ticket.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        ticket_to_delete = self.get_ticket(pk)
        self.is_ticket_user(ticket_to_delete, request.user)
        ticket_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
