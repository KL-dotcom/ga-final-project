from django.urls import path
from .views import BasketDetailView, BasketListView

urlpatterns = [
    path('', BasketListView.as_view()),
    path('<int:pk>/', BasketDetailView.as_view())
]
