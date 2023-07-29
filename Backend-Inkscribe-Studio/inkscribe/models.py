from django.db import models
from django.utils import timezone  
from django.contrib.auth.models import User


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.username



class ComicBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comic_books', blank=True, null=True)
    title = models.CharField(max_length=100)
    issue_number = models.IntegerField(blank=True, null=True)
    photo_url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        if self.user and self.user.username:
            return f"{self.title} by {self.user.username}"
        else:
            return f"{self.title} (User not available)"
        


class Page(models.Model):
    comic_book = models.ForeignKey(ComicBook, on_delete=models.CASCADE, related_name='pages')
    created_at = models.DateTimeField(default=timezone.now)
    page_number = models.IntegerField()
    photo_url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('comic_book', 'page_number')

    def __str__(self):
        return f"Page # {self.page_number} of {self.comic_book.title}"



class Panel(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='panels')
    panel_number = models.IntegerField()
    height = models.PositiveIntegerField(blank=True, null=True)
    width = models.PositiveIntegerField(blank=True, null=True)
    x = models.IntegerField()
    y = models.IntegerField()
    photo_url = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('page', 'panel_number')

    def __str__(self):
        return f"Panel # {self.panel_number} of Page # {self.page.page_number} in {self.page.comic_book.title}"



class SpeechBubble(models.Model):
    panel = models.ForeignKey(Panel, on_delete=models.CASCADE, related_name='speech_bubbles')
    bubble_number = models.IntegerField(blank=True, null=True)
    x = models.IntegerField()
    y = models.IntegerField()
    text = models.TextField()
    color = models.CharField(max_length=10)
    class Meta:
        unique_together = ('panel', 'bubble_number')

    def __str__(self):
        return f"Speech Bubble {self.bubble_number} in Panel # {self.panel.panel_number} of Page # {self.panel.page.page_number} in {self.panel.page.comic_book.title}"
    

    
class Drawing(models.Model):
    panel = models.ForeignKey(Panel, on_delete=models.CASCADE, related_name='drawings')
    photo_url = models.TextField(blank=True, null=True)
    path = models.JSONField()  

    def __str__(self):
        return f"Drawing {self} in Panel # {self.panel.panel_number} of Page # {self.panel.page.page_number} in {self.panel.page.comic_book.title}"
