from json.decoder import JSONDecodeError
from django.http.response import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import Errorcode

# Create your views here.
def index(request):
    return HttpResponse('Hello, world!')

def code_list(request):
    if request.method == 'GET':
        code_total_list = [code for code in Errorcode.objects.all().values()]
        return JsonResponse(code_total_list, safe=False)
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            error_code = json.loads(body)['code']
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        code = Errorcode(code=error_code)
        code.save()
        response_dict = {'id': code.id, 'code': code.code}
        return JsonResponse(response_dict, status=201) 

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])