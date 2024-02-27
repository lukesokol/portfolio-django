from django.shortcuts import render, redirect, reverse
from django.http import HttpResponse, JsonResponse
from django.views import View
from rest_framework.generics import ListAPIView
from .serializers import ProjectSerializers
from portfolio.models import Category, Project, ProjectImages

def index(request):
    context_dict = {}
    context_dict['title'] = 'Home'

    return render(request, 'portfolio/index.html', context_dict)

def about(request):
    context_dict = {}
    context_dict['title'] = 'About'

    return render(request, 'portfolio/about.html', context_dict)

def work(request):
    category_list = Category.objects.all().order_by('id')

    context_dict = {}
    context_dict['title'] = 'Work'
    context_dict['categories'] = category_list

    return render(request, 'portfolio/work.html', context_dict)

def view_project(request, pk):
    try:
        project = Project.objects.get(id=pk)
        roles = project.project_roles.split(",")
        images = ProjectImages.objects.all().filter(project_name_id=pk)
        print(images)
    except Project.DoesNotExist:
        return redirect(reverse('work'))

    context_dict = {'project': project, 'roles': roles, 'images': images}
    return render(request, 'portfolio/view_project.html', context_dict)


class ProjectListing(ListAPIView):
    serializer_class = ProjectSerializers

    def get_queryset(self):
        queryList = Project.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryList = queryList.filter(category__name = category)          
        return queryList
    
def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'