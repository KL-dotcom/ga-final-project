from django.urls import path
from .views import UserImageDetailView, TalkImageDetailView

urlpatterns = [
  path('profileimage/<int:pk>/', UserImageDetailView.as_view()),
  path('talkimage/<int:pk>/', TalkImageDetailView.as_view())
]