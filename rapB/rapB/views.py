from django.conf import settings
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from .src.db import create_chroma_db


@csrf_exempt
def file_upload(request):
    if request.method == 'POST':
        file = request.FILES['file']  # 'file' is the name attribute in your Angular form
        file_name = default_storage.save(f'{settings.BASE_DIR}/src/media/' + file.name, file)
        create_chroma_db(file_name)
        return JsonResponse({'file_name': file_name})

@csrf_exempt
def user_query(request):
    print(request)
    query  = request.body.decode(encoding='utf-8')
    return JsonResponse({'text': f'got your {query}!', 'sender': 'Bot'})
