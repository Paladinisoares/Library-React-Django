from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializers import BookSerializer
import requests
from django.db.models import Q

class ExternalBookSearchAPIView(APIView):
    def get(self, request):
        search_query = request.GET.get('search', '').strip()

        if search_query:
            external_api_url = f"https://www.googleapis.com/books/v1/volumes?q={search_query}"
            response = requests.get(external_api_url)

            if response.status_code == 200:
                external_data = response.json()
                books_data = []

                for item in external_data.get('items', []):
                    book_info = item.get('volumeInfo', {})
                    books_data.append({
                        'title': book_info.get('title', 'Sem título'),
                        'author': ', '.join(book_info.get('authors', ['Desconhecido'])),
                        'genre': ', '.join(book_info.get('categories', ['Sem categoria'])),
                        'publication_year': book_info.get('publishedDate', 'N/A')[:4],
                        'summary': book_info.get('description', 'Sem resumo disponível.'),
                        'coverUrl': book_info.get('imageLinks', {}).get('thumbnail', ''),
                        'external_id': item.get('id'),
                    })

                return Response(books_data, status=status.HTTP_200_OK)

            return Response({'error': 'Erro ao buscar livros externos'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response([], status=status.HTTP_200_OK)
    
class LocalBookListAPIView(APIView):
    def get(self, request):
        search_query = request.GET.get('search', '').strip()

        if search_query:
            books = Book.objects.filter(Q(title__icontains=search_query) | Q(author__icontains=search_query)) 
            if books.exists():
                serializer = BookSerializer(books, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response([], status=status.HTTP_200_OK)

        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BookListCreateAPIView(APIView):
    def post(self, request):
        data = request.data

        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Livro não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Livro não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Livro não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        book.delete()
        return Response({'message': 'Livro excluído com sucesso'}, status=status.HTTP_204_NO_CONTENT)
