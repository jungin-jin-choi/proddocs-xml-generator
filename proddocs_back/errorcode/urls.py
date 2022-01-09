from django.urls import path
from . import views

urlpatterns = [
    path('', views.code_list),
    path('download/code/', views.generate_code_xml),
    path('download/slug/', views.generate_slug_xml),
]