from django.urls import path
from .views import UserImageDetailView, TalkImageDetailView, ImageListViewUser, ImageListViewTalk

urlpatterns = [
    path('user/', ImageListViewUser.as_view()),
    path('talk/', ImageListViewTalk.as_view()),
    path('profileimage/<int:pk>/', UserImageDetailView.as_view()),
    path('talkimage/<int:pk>/', TalkImageDetailView.as_view())
]
