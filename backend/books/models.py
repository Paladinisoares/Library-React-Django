from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    publication_year = models.IntegerField()
    summary = models.TextField()
    coverUrl = models.URLField(max_length=255)
    external_id = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.title
