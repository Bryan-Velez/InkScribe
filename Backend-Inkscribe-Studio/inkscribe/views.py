from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from .models import *
# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class ComicList(generics.ListCreateAPIView):
    queryset = ComicBook.objects.all()
    serializer_class = ComicSerializer

class ComicDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ComicBook.objects.all()
    serializer_class = ComicSerializer



class PageList(generics.ListCreateAPIView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer

class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer



class PanelList(generics.ListCreateAPIView):
    queryset = Panel.objects.all()
    serializer_class = PanelSerializer

class PanelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Panel.objects.all()
    serializer_class = PanelSerializer



class SpeechBubbleList(generics.ListCreateAPIView):
    queryset = SpeechBubble.objects.all()
    serializer_class = SpeechBubbleSerializer

class SpeechBubbleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpeechBubble.objects.all()
    serializer_class = SpeechBubbleSerializer



class DrawingList(generics.ListCreateAPIView):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer

class DrawingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer