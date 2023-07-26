# Generated by Django 4.2.3 on 2023-07-26 22:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inkscribe', '0013_comicbook_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comicbook',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comic_books', to='inkscribe.user'),
        ),
    ]