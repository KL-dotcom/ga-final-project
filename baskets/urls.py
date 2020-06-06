from django.urls import path
from .views import BasketListView

urlpatterns = [
    path('', BasketListView.as_view())
]
