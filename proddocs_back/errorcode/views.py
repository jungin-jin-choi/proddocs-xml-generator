from json.decoder import JSONDecodeError
from django.http.response import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import ErrorObject
from django.views.decorators.csrf import ensure_csrf_cookie

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