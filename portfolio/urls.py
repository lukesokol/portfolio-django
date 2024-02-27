from django.urls import path
from portfolio import views

app_name = 'portfolio'

urlpatterns = [
    path('hero/', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('work/', views.work, name='work'),
    path('project/<str:pk>/', views.view_project, name='project'),
    path("project_listing/", views.ProjectListing.as_view(), name='project_listing'),
]