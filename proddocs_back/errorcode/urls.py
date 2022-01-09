from django.urls import path
from . import views

urlpatterns = [
    path('', views.code_list),
    path('download/', views.generate_xml),
]