# Generated by Django 4.1.7 on 2023-07-01 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0004_project_project_description_project_project_roles_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='projectimages',
            options={'verbose_name_plural': 'Project Images'},
        ),
        migrations.AlterField(
            model_name='project',
            name='project_description',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
    ]
