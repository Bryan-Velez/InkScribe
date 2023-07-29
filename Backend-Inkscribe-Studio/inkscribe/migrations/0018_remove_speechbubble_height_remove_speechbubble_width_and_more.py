# Generated by Django 4.2.3 on 2023-07-29 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inkscribe', '0017_speechbubble_height_speechbubble_width'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='speechbubble',
            name='height',
        ),
        migrations.RemoveField(
            model_name='speechbubble',
            name='width',
        ),
        migrations.AddField(
            model_name='panel',
            name='height',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='panel',
            name='width',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
