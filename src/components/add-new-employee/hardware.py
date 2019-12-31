
print("Setting up things....")
import serial 
import firebase_admin 
from firebase_admin import credentials
from firebase_admin import firestore 
from datetime import datetime
import time
import traceback
print("Dependencies Iported")
​
def read_rfid():
   ser = serial.Serial ("/dev/ttyS1")   
   ser.baudrate = 9600
   data = ser.read(12)
   ser.close ()
   return data
​
​
# def on_change(doc_snapshot, changes, read_time):
#     print("Siooooooooo")
#     for doc in doc_snapshot:
#         print(u"Received document snapshot: {}".format(doc.id))
​
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'projectId' : "first-firebase-learning", 
})
db = firestore.client()
​
​
temp_rfid_ref = db.collection(u'temp_rfid').document(u"store_rfi_temp_id")
attendences_ref = db.collection(u'attendecne')
​
​
# doc_watch = db.collection(u'temp_rfid').document(u"store_rfid_temp_id").on_snapshot(on_change)
class TestWatchInfo():
  def __init__(self):
    self.start_snapshot()
  def start_snapshot(self):
    self.query_watch = db.collection(u'temp_rfid').document("store_rfid_temp_id").on_snapshot(self.on_snapshot)
  def on_snapshot(self, col_snapshot, changes, read_time):
    print("chnaaa")
    try:
        for doc in col_snapshot:
            data = doc.to_dict()
            rfid_request = data[u'rfid_request']
            last_edited = data[u'last_edited']
            if rfid_request == True and last_edited == "client":
                print("Scan rfid")  
                id = read_rfid()
                print(id) 
                temp_rfid_ref.set({
                    "rfid": id,
                    "init_time": datetime.now(),
                    "rfid_request": False
                })
                print("Store rfid")               
            else:
                print("Ignore all changes")
​
​
        # for change in changes:
        #     if change.type.name == "MODIFIED":
        #         print(u"Changes done snapshot: {}".format(change.to_dict()))
            
        #     pass
        
    
        for change in changes:
            pass
    except Exception as err:
      print(err)
      print("Error occurred at " + str(time.ctime()))
      traceback.print_exc()
if __name__ == '__main__':
  try:
    test_object = TestWatchInfo()
    while(True):
      if test_object.query_watch._closed:
        test_object.start_snapshot()
    #   test_object.on_snapshot(on_change)
  except Exception as err:
    print(err)
    print("Error occurred at " + str(time.ctime()))
    traceback.print_exc()
​
​
# while 1:
#     print("PLEASE ENTER THE CARD")
#     id = read_rfid()
#     print(id)
#     docs_attendences = attendences_ref.stream()
#     for doc in docs_attendences:
#         attendence = doc.to_dict()
#         if "rfid" in attendence:
#             if attendence[u'rfid'] == id:
#                 print("U are already registered...")
#             else:
#                 temp_rfid_ref.add({
#                     "rfid": id,
#                     "init_time": datetime.now() 
#                 })
#                 print("Adding Success..., Processsing database triggers")
​
​
​
    # if attendence in docs_attendences:
    #     id = attendence.id
    #     attendence_data = attendence.to_dict()
    #     if "attendences" in attendence_data:
    #         if attendence_data[u'rfid'] == id:
    #             print("U are already registered u can't proceed ahead")
    #         else:
    #             try:
    #                 temp_rfid_ref.add({
    #                     "rfid": id,
    #                     "init_time": datetime.now()
    #                 })
    #                 print("processing data base triggers...")
    #             except:
    #                 print("Some unknown error occoured... Please try again...."