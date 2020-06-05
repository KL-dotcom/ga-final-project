# Generated by Django 3.0.7 on 2020-06-05 17:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('talks', '0002_talk_price'),
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='talk',
            field=models.ManyToManyField(blank=True, related_name='categories', to='talks.Talk'),
        ),
        migrations.AlterField(
            model_name='category',
            name='user',
            field=models.ManyToManyField(blank=True, related_name='categories', to=settings.AUTH_USER_MODEL),
        ),
    ]
