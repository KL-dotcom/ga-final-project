from django.urls import path
from .views import BasketDetailView, BasketListView, BasketUserView

urlpatterns = [
    path('', BasketListView.as_view()),
    path('<int:pk>/', BasketDetailView.as_view()),
    path('query/', BasketUserView.as_view()),
]
