from django.shortcuts import render, get_object_or_404
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
    lookup_field = 'page_number'
class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    lookup_field = 'page_number'

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, comic_book__id=self.kwargs['comic_id'], page_number=self.kwargs['page_number'])
        self.check_object_permissions(self.request, obj)
        return obj



class PanelList(generics.ListCreateAPIView):
    queryset = Panel.objects.all()
    serializer_class = PanelSerializer
    lookup_field = 'panel_number'


class PanelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Panel.objects.all()
    serializer_class = PanelSerializer
    lookup_field = 'panel_number'

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(
            queryset,
            page__comic_book__id=self.kwargs['comic_id'],
            page__page_number=self.kwargs['page_number'],
            panel_number=self.kwargs['panel_number']
        )
        self.check_object_permissions(self.request, obj)
        return obj




class SpeechBubbleList(generics.ListCreateAPIView):
    queryset = SpeechBubble.objects.all()
    serializer_class = SpeechBubbleSerializer

class SpeechBubbleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpeechBubble.objects.all()
    serializer_class = SpeechBubbleSerializer
    lookup_field = 'bubble_number'


    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(
            queryset,
            panel__page__comic_book__id=self.kwargs['comic_id'],
            panel__page__page_number=self.kwargs['page_number'],
            panel__panel_number=self.kwargs['panel_number'],
            bubble_number=self.kwargs['bubble_number']
        )
        self.check_object_permissions(self.request, obj)
        return obj
    



class DrawingList(generics.ListCreateAPIView):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer

class DrawingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer