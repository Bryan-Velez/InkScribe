from django.urls import path
from . import views

urlpatterns = [

    path('user/', views.UserList.as_view(), name='user-list'),
    path('user/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),

    path('comicbooks/', views.ComicList.as_view(), name='comic-book-list'),
    path('comicbooks/<int:pk>/', views.ComicDetail.as_view(), name='comic-book-detail'),

    path('comicbooks/<int:comic_id>/pages/', views.PageList.as_view(), name='page-list'),
    path('comicbooks/<int:comic_id>/pages/<int:page_number>/', views.PageDetail.as_view(), name='page-detail'),

    path('comicbooks/<int:comic_id>/pages/<int:page_number>/panel/', views.PanelList.as_view(), name='panel-list'),
    path('comicbooks/<int:comic_id>/pages/<int:page_number>/panel/<int:panel_number>/', views.PanelDetail.as_view(), name='panel-detail'),

    path('comicbooks/<int:comic_id>/pages/<int:page_number>/panels/<int:panel_number>/speech_bubbles/', views.SpeechBubbleList.as_view(), name='speech-bubble-list'),
    path('comicbooks/<int:comic_id>/pages/<int:page_number>/panels/<int:panel_number>/speech_bubbles/<int:pk>/', views.SpeechBubbleDetail.as_view(), name='speech-bubble-detail'),
   
    path('comicbooks/<int:comic_id>/pages/<int:page_number>/panels/<int:panel_number>/drawing/', views.DrawingList.as_view(), name='drawing-list'),
    path('comicbooks/<int:comic_id>/pages/<int:page_number>/panels/<int:panel_number>/drawing/<int:pk>/', views.DrawingDetail.as_view(), name='drawing-detail'),
]