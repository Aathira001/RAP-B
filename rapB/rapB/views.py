from django.conf import settings
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from .src.db import create_chroma_db
from .src.llm import get_llm, get_qa_chain

import os

llm_chain, llm = get_llm()
qa_chain = get_qa_chain(llm)
# dbqa = setup_dbqa(llm)


@csrf_exempt
def get_file_details(request):
    file_details = []
    files_path = f'{settings.BASE_DIR}/data/media/'
    for filename in os.listdir(files_path):
        full_path = files_path + filename
        file_detail = {}
        file_detail['name'] = filename
        stat = os.stat(full_path)
        file_detail['size'] = stat.st_size / (1024)
        file_details.append(file_detail)
    

    return JsonResponse({'files': file_details})


@csrf_exempt
def file_upload(request):
    if request.method == 'POST':
        file = request.FILES['file']  # 'file' is the name attribute in your Angular form
        file_name = default_storage.save(f'{settings.BASE_DIR}/data/media/' + file.name, file)
        create_chroma_db(file.name)
        return JsonResponse({'file_name': file.name})
    

@csrf_exempt
def rag_user_query(request):
    query  = request.body.decode(encoding='utf-8')
    print('******************************************')
    print(query)
    print('******************************************')
    llm_response = qa_chain(query)
    print('******************************************')
    print(llm_response)
    print('******************************************')
    # response = dbqa({'query': query})
    return JsonResponse({'text': f'{llm_response["result"]}', 'sender': 'Bot', 'source': f'{llm_response["source_documents"]}'})

@csrf_exempt
def user_query(request):
    print(request)
    query  = request.body.decode(encoding='utf-8')
    response = llm_chain.run(query)
    return JsonResponse({'text': f'{response}', 'sender': 'Bot'})
