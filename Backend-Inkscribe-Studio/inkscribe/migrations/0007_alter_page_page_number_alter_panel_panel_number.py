# Generated by Django 4.2.3 on 2023-07-26 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inkscribe', '0006_comicbook_photo_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='page_number',
            field=models.IntegerField(unique=True),
        ),
        migrations.AlterField(
            model_name='panel',
            name='panel_number',
            field=models.IntegerField(unique=True),
        ),
    ]
