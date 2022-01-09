from django.db import migrations, models
import pandas as pd

def add_csv(apps, schema_editor):
    ErrorObject = apps.get_model('errorcode', 'ErrorObject')
    df = pd.read_csv('/Users/jin-choi/proddocs-xml-generator/proddocs_back/errorcode/migrations/exception_codes.csv')
    df = df[['errorCode', 'errorSlug']]
    df = df.fillna('')
    
    for idx, row in df.iterrows():
        ErrorObject(code=row[0], slug=row[1]).save()
        print(row[0])

class Migration(migrations.Migration):
    initial = True
    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ErrorObject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default='', max_length=20, verbose_name='Error Code')),
                ('slug', models.CharField(default='', max_length=20, verbose_name='Error Slug'))
            ],
        ),
        migrations.RunPython(add_csv),
    ]
