from fastapi import FastAPI, Header
app = FastAPI()
from pydantic import BaseModel  #Base class for any class whose objects are used as input to a http request
from fastapi.middleware.cors import CORSMiddleware
import pymongo
import json
from pymongo import MongoClient, InsertOne


client = pymongo.MongoClient("mongodb+srv://evtran:Skiman_1154!@messageapp.unqhawq.mongodb.net/?retryWrites=true&w=majority&appName=messageApp")
db = client.MessagesDatabase
collection = db.messages




origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Message(BaseModel):
    text: str
@app.get("/getMsgs")
async def getMsgs():
    cursor = collection.find({})
    messages = []
    for document in cursor:
        messages.append(document["text"])
    return messages

@app.post('/addMsg')
async def addMsg(msg: Message):
    collection.insert_one({"text": msg.text})
    print("success")
    