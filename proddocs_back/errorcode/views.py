from json.decoder import JSONDecodeError
from django.http.response import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import ErrorObject
from django.views.decorators.csrf import ensure_csrf_cookie
import mimetypes
import os

@ensure_csrf_cookie
def generate_code_xml(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            resource_prefix = json.loads(body)['prefix']
            print(resource_prefix)
            file_name = json.loads(body)['filename']
            print(file_name)
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        content = createCodeXmlContent(resource_prefix)
        print(content)
        response = HttpResponse(content, content_type='text/xml')
        response['Content-Disposition'] = 'attachment; filename={0}'.format(file_name)
        return response
    else:
        return HttpResponseNotAllowed(['POST'])

def generate_slug_xml(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            resource_prefix = json.loads(body)['prefix']
            print(resource_prefix)
            file_name = json.loads(body)['filename']
            print(file_name)
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        content = createSlugXmlContent(resource_prefix)
        print(content)
        response = HttpResponse(content, content_type='text/xml')
        response['Content-Disposition'] = 'attachment; filename={0}'.format(file_name)
        return response
    else:
        return HttpResponseNotAllowed(['POST'])

def createCodeXmlContent(prefix):
    xml_data = ['<?xml version="1.0" encoding="utf-8"?><resources>']
    for error_object in ErrorObject.objects.all().values():
        error_code = error_object['code']
        resource_name = error_object['code'].replace("-","")
        xml_data.append('<string name="{2}{0}">{1}</string>'.format(resource_name, error_code, prefix))
    xml_data.append('</resources>')
    response_content = '\n'.join(xml_data)
    return response_content

def createSlugXmlContent(prefix):
    xml_data = ['<?xml version="1.0" encoding="utf-8"?><resources>']
    for error_object in ErrorObject.objects.all().values():
        error_slug = error_object['slug']
        resource_name = error_object['code'].replace("-","")
        xml_data.append('<string name="{2}{0}">{1}</string>'.format(resource_name, error_slug, prefix))
    xml_data.append('</resources>')
    response_content = '\n'.join(xml_data)
    return response_content

@ensure_csrf_cookie
def code_list(request):
    if request.method == 'GET':
        list_of_error_objects = [code for code in ErrorObject.objects.all().values()]
        return JsonResponse(list_of_error_objects, safe=False)
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            error_code = json.loads(body)['code']
            error_slug = json.loads(body)['slug']
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        error_object = ErrorObject(code=error_code, slug=error_slug)
        error_object.save()
        response_dict = {'id': error_object.id, 'code': error_object.code, 'slug': error_object.slug}
        return JsonResponse(response_dict, status=201) 

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

