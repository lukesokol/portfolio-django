from django.db import models
import os
import xml.etree.cElementTree as et
from uuid import uuid4
from django.utils.deconstruct import deconstructible

@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)

path_and_rename = PathAndRename("projects_images/")
logo_path_and_rename = PathAndRename("projects_logos/")

class Category(models.Model):
    name = models.CharField(max_length=128, unique=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
    
class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    logo = models.FileField(upload_to=logo_path_and_rename, null=True, blank=True, max_length=255)
    picture = models.ImageField(upload_to=path_and_rename, null=True, blank=True, max_length=255)
    title = models.CharField(max_length=128)
    subtitle = models.CharField(max_length=128)
    description = models.CharField(max_length=255)
    project_description = models.CharField(max_length=1024, null=True, blank=True)
    project_roles = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name
    
class ProjectImages(models.Model):
    project_name = models.ForeignKey(Project, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=path_and_rename, null=True, blank=True, max_length=255)
    
    class Meta:
        verbose_name_plural = 'Project Images'

    def __str__(self):
        return str(self.project_name)