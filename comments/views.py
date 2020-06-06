# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from .models import Comment
from .serializers import CommentSerializer, PopulatedCommentSerializer


class CommentListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, _request):
        comments = Comment.objects.all()
        serialized_categories = CommentSerializer(comments, many=True)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)
    def post(self, request):
        request.data['user'] = request.user.id
        new_comment = CommentSerializer(data=request.data)
        if new_comment.is_valid():
            new_comment.save()
            return Response(new_comment.data, status=status.HTTP_201_CREATED)
        return Response(new_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
      
      
class CommentDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def delete(self, request, pk):
        try:
            comment_to_delete = Comment.objects.get(pk=pk)
            if comment_to_delete.user.id != request.user.id:
                raise PermissionDenied()
            comment_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            raise NotFound()