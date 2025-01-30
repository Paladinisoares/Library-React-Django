from django.urls import path
from .views import BookListCreateAPIView, BookDetailAPIView, LocalBookListAPIView, ExternalBookSearchAPIView

urlpatterns = [
    path('books', BookListCreateAPIView.as_view(), name='book-list-create'),
    path('books/', BookListCreateAPIView.as_view(), name='book-list-create'),
    path('books/local-search', LocalBookListAPIView.as_view(), name='book-local-search'),
    path('books/external-search', ExternalBookSearchAPIView.as_view(), name='book-external-search'),
    path('books/<int:pk>', BookDetailAPIView.as_view(), name='book-detail'),
]
