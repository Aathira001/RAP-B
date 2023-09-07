# RAP-B
RAP - B is a question answering bot that uses RAG to answer questions related to a RAP dataset.

The project can be divided into two phases:
1. Sentiment Analysis - A LLM is fine-tuned on the `German Rap` dataset to identify the emotions/category that is associated with a particular rap lyrics. This fine-tuned model would then be used to classify English rap lyrics that are present in the `English Rap` dataset.

2. RAG - Using available tools like LangChain, DeepLake/FAISS along with a User Interface and API calls, a chatbot is created which would allow you to talk to your dataset. This is not data dependant, but for the purpose of this project we would use the RAP datasets alone in the initial stages.
