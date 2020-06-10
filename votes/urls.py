from django.urls import path
from .views import VotesListView

urlpatterns = [
    path('', VotesListView.as_view()),

]
