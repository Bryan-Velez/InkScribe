# Generated by Django 4.2.3 on 2023-07-26 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inkscribe', '0008_alter_page_page_number_alter_panel_panel_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='comicbook',
            name='issue_number',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='speechbubble',
            name='bubble_number',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='speechbubble',
            unique_together={('panel', 'bubble_number')},
        ),
    ]