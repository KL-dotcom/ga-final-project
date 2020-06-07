# Generated by Django 3.0.7 on 2020-06-07 13:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0007_category_talk'),
        ('jwt_auth', '0002_auto_20200606_1015'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='interests',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='User', to='categories.Category'),
            preserve_default=False,
        ),
    ]
