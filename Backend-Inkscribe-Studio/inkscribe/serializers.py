from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')




      


class SpeechBubbleSerializer(serializers.ModelSerializer):
    panel = serializers.SlugRelatedField(
        slug_field='panel_number', queryset=Panel.objects.all()
    )
    class Meta:
        model = SpeechBubble
        fields = '__all__'

class PanelSerializer(serializers.ModelSerializer):
    speech_bubbles = SpeechBubbleSerializer(many=True, read_only=True)
    page = serializers.SlugRelatedField(
        slug_field='page_number', queryset=Page.objects.all()
    )
      
    class Meta:
        model = Panel
        fields = '__all__'

class DrawingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawing
        fields = '__all__'


class PageSerializer(serializers.ModelSerializer):
    panels = PanelSerializer(many=True, read_only=True)
    class Meta:
        model = Page
        fields = '__all__'

    

class ComicSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True, read_only=True)
    class Meta:
        model = ComicBook
        fields = '__all__'

