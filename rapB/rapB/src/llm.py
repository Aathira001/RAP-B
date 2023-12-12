from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.llms import LlamaCpp
from langchain.prompts import PromptTemplate


from langchain.chains import ConversationChain
from langchain.chains import RetrievalQA

from .db import get_chroma_db_retriever

def build_prompt():
    template = """ You are a helpful chatbot. You answer the questions based on what you find in the context.
    Context: {context}
    Question: {question}
    Helpful Answer:"""
    
    prompt = PromptTemplate(input_variables=["context", "question"], template=template)
    return prompt

def get_qa_chain(llm):
    retriever = get_chroma_db_retriever()
    qa_chain = RetrievalQA.from_chain_type(
                                  llm=llm,
                                  chain_type="stuff",
                                  retriever=retriever,
                                  return_source_documents=True,
                                  verbose=True,
                                  chain_type_kwargs={"prompt": build_prompt()})
    return qa_chain

def get_llm():

    template = """ You are a music artist and sentiment analyser. Analyse the lyrics and describe emotion in 5 words or less that is associated with it.
    
    Lyrics: {lyrics}

    Answer: """

    prompt = PromptTemplate(template=template, input_variables=["lyrics"])

    # Callbacks support token-wise streaming
    callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])

    llm = LlamaCpp(
        model_path="/home/aa21142/Desktop/star/rapb/RAP-B/rapB/model/llama-2-70b.Q5_0.gguf",
        temperature=0,
        max_tokens=50,
        callback_manager=callback_manager,
        verbose=True,  # Verbose is required to pass to the callback manager
    )


    llm_chain = ConversationChain(prompt=prompt, llm=llm)

    return llm_chain, llm

