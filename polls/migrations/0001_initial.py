# Generated by Django 3.0.7 on 2020-06-17 15:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('talks', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=300)),
                ('option_a', models.CharField(max_length=300)),
                ('option_b', models.CharField(max_length=300)),
                ('option_c', models.CharField(max_length=300)),
                ('option_d', models.CharField(max_length=300)),
                ('option_a_count', models.IntegerField(default=0)),
                ('option_b_count', models.IntegerField(default=0)),
                ('option_c_count', models.IntegerField(default=0)),
                ('option_d_count', models.IntegerField(default=0)),
                ('talk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='polls', to='talks.Talk')),
            ],
        ),
    ]