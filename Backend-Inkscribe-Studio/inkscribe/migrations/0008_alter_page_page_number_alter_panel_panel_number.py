# Generated by Django 4.2.3 on 2023-07-26 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inkscribe', '0007_alter_page_page_number_alter_panel_panel_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='page_number',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='panel',
            name='panel_number',
            field=models.IntegerField(),
        ),
    ]
