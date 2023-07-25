from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ComicSerializer(serializers.ModelSerializer):
    pages = serializers.HyperlinkedRelatedField(
        view_name='page-detail',
        many=True,
        read_only=True
    )

    class Meta:
        model = ComicBook
        fields = '__all__'


class PanelSerializer(serializers.ModelSerializer):
    speech_bubbles = serializers.HyperlinkedRelatedField(
        view_name='speech-bubble-detail',
        many=True,
        read_only=True
    )

    class Meta:
        model = Panel
        fields = '__all__'


class SpeechBubbleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeechBubble
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


