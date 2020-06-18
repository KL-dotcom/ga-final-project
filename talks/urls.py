from django.urls import path
from .views import TalkListView, TalkDetailView

urlpatterns = [
    path('', TalkListView.as_view()),
    path('<int:pk>/', TalkDetailView.as_view()),
]
