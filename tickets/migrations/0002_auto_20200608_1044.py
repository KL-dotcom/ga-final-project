# Generated by Django 3.0.7 on 2020-06-08 10:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('talks', '0004_auto_20200608_1024'),
        ('tickets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='talk',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='talks_tickets', to='talks.Talk'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_tickets', to=settings.AUTH_USER_MODEL),
        ),
    ]