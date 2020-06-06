# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Ticket
from .serializers import PopulatedTicketSerializer


class TicketListView(APIView):
  permission_classes = (IsAuthenticated,)
  
  def get(self, _request):
    tickets = Ticket.objects.all()
    serialized_tickets = PopulatedTicketSerializer(tickets, many=True)
    return Response(serialized_tickets.data, status=status.HTTP_200_OK)



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