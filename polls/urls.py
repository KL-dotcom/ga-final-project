from django.urls import path
from .views import PollListView, PollDetailView

urlpatterns = [
    path('', PollListView.as_view()),
    path('<int:pk>/', PollDetailView.as_view()),
]
