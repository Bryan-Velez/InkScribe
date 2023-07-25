from django.urls import path
from . import views

urlpatterns = [

    path('user/', views.UserList.as_view(), name='user-list'),
    path('user/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),

    path('comicbook/', views.ComicList.as_view(), name='comic-book-list'),
    path('comicbook/<int:pk>/', views.ComicDetail.as_view(), name='comic-book-detail'),

    path('comicbook/<int:comic_id>/pages/', views.PageList.as_view(), name='page-list'),
    path('comicbook/<int:comic_id>/pages/<int:pk>/', views.PageDetail.as_view(), name='page-detail'),

    path('comicbook/<int:comic_id>/pages/<int:page_id>/panel/', views.PanelList.as_view(), name='panel-list'),
    path('comicbook/<int:comic_id>/pages/<int:page_id>/panel/<int:pk>/', views.PanelDetail.as_view(), name='panel-detail'),

    path('panel/<int:panel_id>/speech_bubble/', views.SpeechBubbleList.as_view(), name='speech-bubble-list'),
    path('panel/<int:panel_id>/speech_bubble/<int:pk>/', views.SpeechBubbleDetail.as_view(), name='speech-bubble-detail'),
   
    path('panel/<int:panel_id>/drawing/', views.DrawingList.as_view(), name='drawing-list'),
    path('panel/<int:panel_id>/drawing/<int:pk>/', views.DrawingDetail.as_view(), name='drawing-detail'),
]