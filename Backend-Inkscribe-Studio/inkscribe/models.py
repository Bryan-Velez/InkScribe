from django.db import models
from django.utils import timezone  

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.username



class ComicBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comic_books')
    title = models.CharField(max_length=100)
    photo_url = models.URLField
    description = models.TextField()

    def __str__(self):
        return self.title
        


class Page(models.Model):
    comic_book = models.ForeignKey(ComicBook, on_delete=models.CASCADE, related_name='pages')
    created_at = models.DateTimeField(default=timezone.now)
    page_number = models.IntegerField()

    def __str__(self):
        return f"Page {self.page_number} of {self.comic_book.title}"



class Panel(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='panels')
    panel_number = models.IntegerField()
    x = models.IntegerField()
    y = models.IntegerField()

    def __str__(self):
        return f"Panel {self.panel_number} of {self.page.page_number}"



class SpeechBubble(models.Model):
    panel = models.ForeignKey(Panel, on_delete=models.CASCADE, related_name='speech_bubbles')
    x = models.IntegerField()
    y = models.IntegerField()
    text = models.TextField()
    color = models.CharField(max_length=10)

    def __str__(self):
        return f"Speech Bubble {self} in Panel {self.panel}"
    

    
class Drawing(models.Model):
    panel = models.ForeignKey(Panel, on_delete=models.CASCADE, related_name='drawings')
    photo_url = models.URLField(blank=True, null=True)
    path = models.JSONField()  

    def __str__(self):
        return f"Drawing {self} in Panel {self.panel}"
