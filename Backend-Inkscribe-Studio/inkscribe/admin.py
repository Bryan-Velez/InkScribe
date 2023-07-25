from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(User)
admin.site.register(ComicBook)
admin.site.register(Page)
admin.site.register(Panel)
admin.site.register(SpeechBubble)
admin.site.register(Drawing)
